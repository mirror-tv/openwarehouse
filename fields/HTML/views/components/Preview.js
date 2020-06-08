import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'elemental';

class Preview extends Component {
	componentWillReceiveProps (nextProps) {}
  restructTarg (href) {
    return _.endsWith(href, '/') ? href : `${href}/`
  }
  render () {
    const { cancelLabel, confirmationType, isOpen, onCancel, onConfirmation, headerText, previewId } = this.props;
    return (
      <Modal onCancel={onCancel} width={1210} isOpen={isOpen} backdropClosesModal>
        <ModalHeader text={ headerText } showCloseButton onClose={onCancel} />
        <ModalBody style={{ marginLeft: '0', marginRight: '0', paddingLeft: '0', paddingRight: '0' }}>
          <div style={{ height: '70vh' }}>
            <iframe src={this.restructTarg(Keystone.preview) + previewId + '?preview=true'}
              width="100%" height='100%' frameborder="0"
              style={{ 
                width: '1px', minWidth: '100%', '*width': '100%' ,
                border: 'none'
              }}></iframe>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="primary" onClick={onCancel}>{ cancelLabel }</Button>
        </ModalFooter>
      </Modal>
    )
  }
};
Preview.propTypes = {
	cancelLabel: React.PropTypes.string,
	onCancel: React.PropTypes.func,
  headerText: React.PropTypes.string,
  previewId: React.PropTypes.string,
};
Preview.defaultProps = {
	cancelLabel: 'Close',
  isOpen: false,
  headerText: 'Preveiw',
  previewId: '',
};

export default Preview;
