import React from 'react'
import { connect } from 'react-redux'
import '../styles/loader.scss'

function Loader(props) {
  return (
    <>
      {
        (props.isShow)
          ?
          <div className="loader-inner">
            <div className="loader">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
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
    isShow: state.loader.isShow
  }
}

export default connect(mapStateToProps, null)(Loader)