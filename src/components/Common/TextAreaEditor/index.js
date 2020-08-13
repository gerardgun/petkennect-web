import React from 'react'
import PropTypes from 'prop-types'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import './style.scss'

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'Link',
      'bulletedList',
      'numberedList',
      '|',
      'Indent',
      'Outdent',
      '|',
      'Blockquote',
      'insertTable',
      '|',
      'undo',
      'redo'
    ],location: 'bottom'
  },
  toolbarLocation: 'bottom',
  table          : {
    contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  }
}

function TextAreaEditor(props) {
  const {
    // Props that needs managed for TextAreaEditor
    onChange,
    onBlur,
    value,
    // Props for CKEditor
    ...rest
  } = props

  const _handleEditorBlur = (e, editor) => {
    const data = {
      ...props,
      value: editor.getData()
    }

    onBlur.call(this, e, data)
  }

  const _handleEditorChange = (e, editor) => {
    const data = {
      ...props,
      value: editor.getData()
    }

    onChange.call(this, e, data)
  }

  const _handleEditorInit = editor => {
    editor.ui.view.element.classList.add('textarea-editor')
  }

  return (
    <CKEditor
      config={editorConfiguration} data={value} editor={ClassicEditor}
      onBlur={_handleEditorBlur}
      onChange={_handleEditorChange}
      onInit={_handleEditorInit} {...rest}/>
  )
}

TextAreaEditor.propTypes = {
  onChange: PropTypes.func.isRequired
}

TextAreaEditor.defaultProps = {
  onChange: () => {}
}

export default TextAreaEditor
