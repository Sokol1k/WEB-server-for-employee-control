import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { showAlert } from '../store/alert/actions'
import '../styles/alert.scss'

function Alert(props) {

  useEffect(() => {
    if (props.isShow) {
      setTimeout(() => {
        props.showAlert({
          type: '',
          message: '',
          isShow: false,
        })
      }, 4000)
    }
  }, [props])

  return (
    <>
      {
        (props.isShow)
          ?
          <div className="alert-inner">
            <div className={`alert alert-${props.type}`} role="alert">
              {props.message}
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
    type: state.alert.type,
    message: state.alert.message,
    isShow: state.alert.isShow
  }
}

const mapDispatchToProps = {
  showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)