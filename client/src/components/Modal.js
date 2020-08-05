import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { showModal } from '../store/modal/actions'
import '../styles/modal.scss'

function Modal(props) {

  const close = () => {
    props.showModal({
      isShow: false,
      activationFunction: null,
      message: ''
    })
  }

  const yes = async () => {
    
    await props.activationFunction()

    close()

  }

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    const yesButton = document.getElementById('yesButton')
    if(props.isShow) {
      body.classList.add('overflow-hidden')
      yesButton.focus()
    } else {
      body.classList.remove('overflow-hidden')
    }
  }, [props])

  return (
    <>
      {
        props.isShow
          ?
          <div className="modal-inner">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <p>{props.message}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" id="yesButton" className="btn btn-primary" onClick={ yes }>Yes</button>
                  <button type="button" className="btn btn-secondary" onClick={ close }>No</button>
                </div>
              </div>
            </div>
          </div>
          :
          null
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    isShow: state.modal.isShow,
    activationFunction: state.modal.activationFunction,
    message: state.modal.message
  }
}

const mapDispatchToProps = {
  showModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)