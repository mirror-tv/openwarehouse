import _ from 'lodash';
import { Button, Col, Form, FormField, FormInput, ResponsiveText, Row } from 'elemental';
import { findDOMNode } from 'react-dom';
import AltText from './AltText';
import ConfirmationDialog from './ConfirmationDialog';
import Fields from '../fields';
import FooterBar from './FooterBar';
import FormHeading from './FormHeading';
import InvalidFieldType from './InvalidFieldType';
import Preview from './Preview'
import React from 'react';
import getFormData from 'get-form-data';
import moment from 'moment';
import xhr from 'xhr';

function upCase(str) {
  return str.slice(0, 1).toUpperCase() + str.substr(1).toLowerCase();
};

function keyboard(keyCode) {
  const key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler` 
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    // event.preventDefault(); 
  };

  //The `upHandler` 
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    // event.preventDefault(); 
  };

  //Attach event listeners 
  window.addEventListener(
    'keydown', key.downHandler.bind(key), false
  );
  window.addEventListener(
    'keyup', key.upHandler.bind(key), false
  );
  return key;
}

var EditForm = React.createClass({
  componentDidMount() {
    if (Keystone.editorController) {
      const keyCtrls = [
        keyboard(224),
        keyboard(17),
        keyboard(91),
        keyboard(93)
      ];
      const isKeyCtrlsPressed = [false, false, false, false];
      _.map(keyCtrls, (o, i) => {
        o.press = () => {
          isKeyCtrlsPressed[i] = true
        }
        o.release = () => {
          isKeyCtrlsPressed[i] = false
        }
      })

      document.addEventListener('click', (evt) => {
        const e = evt || window.event;
        const targ = e.target;
        const _handler = (href) => {
          const confirmationDialog = (
            <ConfirmationDialog
              isOpen
              body={'You are about to leave this page. Are you sure?'}
              confirmationLabel="Leave"
              onCancel={this.removeConfirmationDialog}
              onConfirmation={this.handleLeave}
            />
          );
          if (_.filter(isKeyCtrlsPressed, (i) => (i)).length === 0) {
            event.preventDefault();
            this.setState({ leaveFor: href });
            this.setState({ confirmationDialog });
          }
        }

        if (targ.tagName.indexOf('A') === 0) {
          _handler(targ.getAttribute('href'))
        } else {
          const realNode = this.isDescendant('A', targ)
          if (realNode) {
            _handler(realNode.getAttribute('href'))
          }
        }
      }, true)
      window.onpagehide = () => {
        this.handleLeave()
      };
      window.onunload = () => {
        this.handleLeave()
      };
    }
  },
  displayName: 'EditForm',
  propTypes: {
    data: React.PropTypes.object,
    list: React.PropTypes.object,
  },
  getInitialState() {
    return {
      values: Object.assign({}, this.props.data.fields),
      confirmationDialog: null,
    };
  },
  getFieldProps(field) {
    var props = Object.assign({}, field);
    props.value = this.state.values[field.path];
    props.values = this.state.values;
    props.onChange = this.handleChange;
    props.mode = 'edit';
    return props;
  },
  handleChange(event) {
    let values = Object.assign({}, this.state.values);
    values[event.path] = event.value;
    this.setState({ values });
  },
  handleLeave() {
    if (Keystone.notifyBeforeLeave) {
      window.onbeforeunload = null;
    }
    this.props.unlockEditorController({
      callback: () => {
        window.location = this.state.leaveFor;
      }
    });
  },
  isDescendant(parentTag, child) {
    let node = child.parentNode;
    while (node !== null) {
      if (node.tagName === parentTag) {
        return node;
      }
      node = node.parentNode;
    }
    return false;
  },
  confirmReset(event) {
    const confirmationDialog = (
      <ConfirmationDialog
        isOpen
        body={`Reset your changes to <strong>${this.props.data.name}</strong>?`}
        confirmationLabel="Reset"
        onCancel={this.removeConfirmationDialog}
        onConfirmation={this.handleReset}
      />
    );
    event.preventDefault();
    this.setState({ confirmationDialog });
  },
  handleReset() {
    if (Keystone.notifyBeforeLeave) {
      window.onbeforeunload = null;
    }
    window.location.reload();
  },
  confirmDelete() {
    const confirmationDialog = (
      <ConfirmationDialog
        isOpen
        body={`Are you sure you want to delete <strong>${this.props.data.name}?</strong><br /><br />This cannot be undone.`}
        confirmationLabel="Delete"
        onCancel={this.removeConfirmationDialog}
        onConfirmation={this.handleDelete}
      />
    );
    this.setState({ confirmationDialog });
  },
  handleDelete() {
    let { data, list } = this.props;
    if (Keystone.notifyBeforeLeave) {
      window.onbeforeunload = null;
    }
    list.deleteItem(data.id, err => {
      if (err) {
        console.error(`Problem deleting ${list.singular}: ${data.name}`);
        // TODO: slow a flash message on form
        return;
      }
      top.location.href = `${Keystone.adminPath}/${list.path}`;
    });
  },
  handleKeyFocus() {
    const input = findDOMNode(this.refs.keyOrIdInput);
    input.select();
  },
  handleSave() {
    const formElement = document.querySelector('form.EditForm-container');
    if (Keystone.notifyBeforeLeave) {
      window.onbeforeunload = null;
    }
    window.onpagehide = null;
    window.onunload = null;
    formElement.submit();
  },
  handlePreview() {
    const previewer = (
      <Preview
        isOpen={true}
        onCancel={this.removePreviewer}
        previewId={_.get(this.props.data, [Keystone.previewId])}
      />
    );
    this.setState({ previewer });
  },
  removeConfirmationDialog() {
    this.setState({
      confirmationDialog: null,
    });
  },
  removePreviewer() {
    this.setState({
      previewer: null,
    });
  },
  renderKeyOrId() {
    var className = 'EditForm__key-or-id';
    var list = this.props.list;

    if (list.nameField && list.autokey && this.props.data[list.autokey.path]) {
      return (
        <div className={className}>
          <AltText
            normal={`${upCase(list.autokey.path)}: `}
            modified="ID:"
            component="span"
            title="Press <alt> to reveal the ID"
            className="EditForm__key-or-id__label" />
          <AltText
            normal={<input ref="keyOrIdInput" onFocus={this.handleKeyFocus} value={this.props.data[list.autokey.path]} className="EditForm__key-or-id__input" readOnly />}
            modified={<input ref="keyOrIdInput" onFocus={this.handleKeyFocus} value={this.props.data.id} className="EditForm__key-or-id__input" readOnly />}
            component="span"
            title="Press <alt> to reveal the ID"
            className="EditForm__key-or-id__field" />
        </div>
      );
    } else if (list.autokey && this.props.data[list.autokey.path]) {
      return (
        <div className={className}>
          <span className="EditForm__key-or-id__label">{list.autokey.path}: </span>
          <div className="EditForm__key-or-id__field">
            <input ref="keyOrIdInput" onFocus={this.handleKeyFocus} value={this.props.data[list.autokey.path]} className="EditForm__key-or-id__input" readOnly />
          </div>
        </div>
      );
    } else if (list.nameField) {
      return (
        <div className={className}>
          <span className="EditForm__key-or-id__label">ID: </span>
          <div className="EditForm__key-or-id__field">
            <input ref="keyOrIdInput" onFocus={this.handleKeyFocus} value={this.props.data.id} className="EditForm__key-or-id__input" readOnly />
          </div>
        </div>
      );
    }
  },
  renderNameField() {
    var nameField = this.props.list.nameField;
    var nameIsEditable = this.props.list.nameIsEditable;
    var wrapNameField = field => (
      <div className="EditForm__name-field">
        {field}
      </div>
    );
    if (nameIsEditable) {
      var nameFieldProps = this.getFieldProps(nameField);
      nameFieldProps.label = null;
      nameFieldProps.size = 'full';
      nameFieldProps.inputProps = {
        className: 'item-name-field',
        placeholder: nameField.label,
        size: 'lg',
      };
      return wrapNameField(
        React.createElement(Fields[nameField.type], nameFieldProps)
      );
    } else {
      return wrapNameField(
        <h2>{this.props.data.name || '(no name)'}</h2>
      );
    }
  },
  renderFormElements() {
    var headings = 0;

    return this.props.list.uiElements.map((el) => {
      if (el.type === 'heading') {
        headings++;
        el.options.values = this.state.values;
        el.key = 'h-' + headings;
        return React.createElement(FormHeading, el);
      }

      if (el.type === 'field') {
        var field = this.props.list.fields[el.field];
        var props = this.getFieldProps(field);
        if (typeof Fields[field.type] !== 'function') {
          return React.createElement(InvalidFieldType, { type: field.type, path: field.path, key: field.path });
        }
        if (props.dependsOn) {
          props.currentDependencies = {};
          Object.keys(props.dependsOn).forEach(dep => {
            props.currentDependencies[dep] = this.state.values[dep];
          });
        }
        props.key = field.path;
        return React.createElement(Fields[field.type], props);
      }
    }, this);
  },
  renderFooterBar() {
    const buttons = [];
    if (Keystone.preview) {
      buttons.push(
        <Button key="preview" type="primary" onClick={this.handlePreview} style={{ marginRight: '5px' }}>Preview</Button>
      );
    }
    buttons.push(<Button key="save" type="primary" onClick={this.handleSave}>Save</Button>)
    buttons.push(
      <Button key="reset" onClick={this.confirmReset} type="link-cancel">
        <ResponsiveText hiddenXS="reset changes" visibleXS="reset" />
      </Button>
    );
    if (!this.props.list.nodelete) {
      buttons.push(
        <Button key="del" onClick={this.confirmDelete} type="link-delete" className="u-float-right">
          <ResponsiveText hiddenXS={`delete ${this.props.list.singular.toLowerCase()}`} visibleXS="delete" />
        </Button>
      );
    }
    return (
      <FooterBar className="EditForm__footer">
        {buttons}
      </FooterBar>
    );
  },
  renderTrackingMeta() {
    if (!this.props.list.tracking) return null;

    var elements = [];
    var data = {};

    if (this.props.list.tracking.createdAt) {
      data.createdAt = this.props.data.fields[this.props.list.tracking.createdAt];
      if (data.createdAt) {
        elements.push(
          <FormField key="createdAt" label="Created on">
            <FormInput noedit title={moment(data.createdAt).format('DD/MM/YYYY h:mm:ssa')}>{moment(data.createdAt).format('Do MMM YYYY')}</FormInput>
          </FormField>
        );
      }
    }

    if (this.props.list.tracking.createdBy) {
      data.createdBy = this.props.data.fields[this.props.list.tracking.createdBy];
      if (data.createdBy) {
        // todo: harden logic around user name
        elements.push(
          <FormField key="createdBy" label="Created by">
            <FormInput noedit>{data.createdBy.name.first} {data.createdBy.name.last}</FormInput>
          </FormField>
        );
      }
    }

    if (this.props.list.tracking.updatedAt) {
      data.updatedAt = this.props.data.fields[this.props.list.tracking.updatedAt];
      if (data.updatedAt && (!data.createdAt || data.createdAt !== data.updatedAt)) {
        elements.push(
          <FormField key="updatedAt" label="Updated on">
            <FormInput noedit title={moment(data.updatedAt).format('DD/MM/YYYY h:mm:ssa')}>{moment(data.updatedAt).format('Do MMM YYYY')}</FormInput>
          </FormField>
        );
      }
    }

    if (this.props.list.tracking.updatedBy) {
      data.updatedBy = this.props.data.fields[this.props.list.tracking.updatedBy];
      if (data.updatedBy && (!data.createdBy || data.createdBy.id !== data.updatedBy.id || elements.updatedAt)) {
        elements.push(
          <FormField key="updatedBy" label="Updated by">
            <FormInput noedit>{data.updatedBy.name.first} {data.updatedBy.name.last}</FormInput>
          </FormField>
        );
      }
    }

    return Object.keys(elements).length ? (
      <div className="EditForm__meta">
        <h3 className="form-heading">Meta</h3>
        {elements}
      </div>
    ) : null;
  },
  render() {
    return (
      <form method="post" encType="multipart/form-data" className="EditForm-container">
        <Row>
          <Col lg="3/4">
            <Form type="horizontal" className="EditForm" component="div">
              <input type="hidden" name="action" value="updateItem" />
              <input type="hidden" name={Keystone.csrf.key} value={Keystone.csrf.value} />
              {this.renderNameField()}
              {this.renderKeyOrId()}
              {this.renderFormElements()}
              {this.renderTrackingMeta()}
            </Form>
          </Col>
          <Col lg="1/4"><span /></Col>
        </Row>
        {this.renderFooterBar()}
        {this.state.confirmationDialog}
        {this.state.previewer}
      </form>
    );
  },
});

module.exports = EditForm;
