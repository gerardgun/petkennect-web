import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Modal, Button, Icon  } from 'semantic-ui-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import ReportSidebar from './report-card-sidebar'
import ReportContent from './report-card-content'

import reportCardSettingDetailDuck from '@reducers/pet/report-card-setting/detail'

import './styles.scss'

const ReportCardModal = props => {
  const { reportCardDetail } = props

  useEffect(() => {
    if(reportCardDetail.mode === 'READ')
      props.get()
  }, [ reportCardDetail.mode ])

  const _handleClose = () => {
    props.resetItem()
  }

  console.log(props.reportName)

  const _handlePrintDocument = () => {
    const input = document.getElementById('divToPrint')
    html2canvas(input,
      { useCORS: true, allowTaint: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const pdf = new jsPDF('l', 'mm', 'letter')
        //         var pdf = new jsPDF("l", "mm", "a4");
        // var imgData = canvas.toDataURL('image/jpeg', 1.0);

        // // due to lack of documentation; try setting w/h based on unit
        // pdf.addImage(imgData, 'JPEG', 10, 10, 180, 150);  // 180x150 mm @ (10,10)mm
        pdf.addImage(imgData, 'JPEG', 15, 8, 240, 200)
        pdf.output('dataurlnewwindow')
      })
  }

  const _handleDownloadDocument = () => {
    const input = document.getElementById('divToPrint')
    html2canvas(input,
      { useCORS: true, allowTaint: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0)
        const pdf = new jsPDF('l', 'mm', 'letter')
        //         var pdf = new jsPDF("l", "mm", "a4");
        // var imgData = canvas.toDataURL('image/jpeg', 1.0);

        // // due to lack of documentation; try setting w/h based on unit
        // pdf.addImage(imgData, 'JPEG', 10, 10, 180, 150);  // 180x150 mm @ (10,10)mm
        pdf.addImage(imgData, 'JPEG', 15, 8, 240, 200)

        pdf.save(`${`${props.reportName}.pdf`}`)
      })
  }

  return (
    <>
      <Modal
        className='modal-print-size'
        onClose={_handleClose}
        open={reportCardDetail.mode === 'READ'}
        size='medium'>
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Grid columns={2}>
                  <Grid.Column
                    className='button-align'
                    computer={16} mobile={12} tablet={8}>
                    <Button
                      basic
                      color='teal' onClick={_handlePrintDocument}><Icon name='print'></Icon> Print</Button>
                    <Button
                      basic
                      color='teal' onClick={_handleDownloadDocument}><Icon name='download'></Icon> Download</Button>
                  </Grid.Column>
                </Grid>
                <Grid width={16}>
                  <Grid.Column
                    className='mh40' width={16}>
                    <Grid
                      className='pdf-layout-modal'
                      id='divToPrint' width={16}>
                      <Grid.Column width={4}>
                        <ReportSidebar
                          imageSlider={props.imageSlider} textColor={props.textColor} themeColor={props.themeColor}/>
                      </Grid.Column >
                      <Grid.Column width={12}>
                        <ReportContent
                          imageSlider={props.imageSlider} reportName={props.reportName}
                          textColor={props.textColor} themeColor={props.themeColor}/>
                      </Grid.Column >
                    </Grid>
                  </Grid.Column >
                </Grid>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default compose(
  connect(
    state  => {
      const reportCardDetail = reportCardSettingDetailDuck.selectors.detail(state)

      return {
        reportCardDetail
      }
    },
    {
      get      : reportCardSettingDetailDuck.creators.get,
      patch    : reportCardSettingDetailDuck.creators.patch,
      resetItem: reportCardSettingDetailDuck.creators.resetItem
    }
  )
)(ReportCardModal)
