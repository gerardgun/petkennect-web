import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header , Divider, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import SendDocumentEmail from './SendDocumentForm'
import DocumentUploadForm from './UploadDocumentForm'
import EditDocumentForm from './EditDocumentForm'
import ShowDocumentForm from './ShowDocumentForm'
import clientDocumentDuck from '@reducers/client/document'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

function DocumentsSection({ clientDocument, clientDocumentDetail, ...props })
{
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()

  const [ openEditDocumentFormModal, { _handleOpen: _handleOpenEditDocumentFormModal, _handleClose: _handleCloseEditDocumentFormModal } ] = useModal()

  const { id } = useParams()

  useEffect(()=> {
    props.getClientDocuments({ client_id: id })
  }, [])

  useEffect(() => {
    const { status } =  clientDocumentDetail

    if(status === 'DELETED' || status  === 'POSTED' || status === 'PUT')
      props.getClientDocuments({ client_id: id })
  }, [ clientDocumentDetail.status ])

  const _handleOptionClick = option => {
    switch (option) {
      case 'view_pdf':
        window.open(clientDocument.selector.selected_items[0].filepath)

        return

      case 'edit':
        props.setItem(clientDocument.selector.selected_items[0], 'UPDATE')
        _handleOpenEditDocumentFormModal()

        return

      case 'delete':
        props.setItem(clientDocument.selector.selected_items, 'DELETE')
        _handleOpen()

        return

      case 'send_document':
        props.setItem(clientDocument.selector.selected_items[0])
        _handleOpenEmailFormModal()

        return

      default:
        return
    }
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'Show')
    _handleOpenEditDocumentFormModal()
  }

  const _handleSaveBtnClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  const saving = [ 'PUTTING', 'POSTING' ].includes(clientDocumentDuck.status)

  return (
    <div className='c-document-section'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Documents
        </Header>

      </div>
      <Divider className='m0'/>
      <div className='flex justify-end mh40 mt32'>
        <Button
          className='ml16'
          color='teal'
          content='New Document'
          loading={saving}
          // eslint-disable-next-line react/jsx-handler-names
          onClick={_handleSaveBtnClick}
          size='small'/>
      </div>

      <div className='mh40 mt20'>
        <Table
          duck={clientDocumentDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </div>
      <SendDocumentEmail onClose={_handleCloseEmailFormModal} open={openEmailFormModal}/>

      <DocumentUploadForm/>

      <EditDocumentForm onClose={_handleCloseEditDocumentFormModal} open={openEditDocumentFormModal}/>

      <ShowDocumentForm onClose={_handleCloseEditDocumentFormModal} open={openEditDocumentFormModal}/>

      <ModalDelete
        duck={clientDocumentDuck}
        duckDetail={clientDocumentDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </div>
  )
}

DocumentsSection.prototype = {    }

DocumentsSection.defaultProps = {    }

export default compose(
  connect(
    ({ ...state }) => ({
      clientDocument      : clientDocumentDuck.selectors.list(state),
      clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state)
    }),{
      setItem           : clientDocumentDetailDuck.creators.setItem,
      getClientDocuments: clientDocumentDuck.creators.get
    }
  )
)(DocumentsSection)
