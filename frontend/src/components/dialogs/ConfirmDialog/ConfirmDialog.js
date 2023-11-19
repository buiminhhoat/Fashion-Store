import React from "react";
import "./style.scss"

const ConfirmDialog = ({title, subTitle, titleBtnAccept, titleBtnCancel, onAccept, onCancel}) => {

  return (
      <div className="modal fade show" id="modal-auth" tabIndex="-1" aria-labelledby="exampleModalLabel"
           style={{ display: 'block', paddingLeft: '0px' }} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{color:"#333333", padding:"30px", width:"550px"}}>
            <div style={{marginBottom:"13px"}}>
              <span style={{fontSize:"23px", fontWeight:"900"}}>{title}</span>
            </div>
            <div style={{fontSize:"16px", fontWeight:"800", color:"#4f525d", wordWrap: "break-word", lineHeight: "1.8"}}>
              <span>{subTitle}</span>
            </div>
            <div className="button-container" style={{marginTop:"40px"}}>
              <button type="button" className="confirm-dialog-btn" onClick={onAccept}>{titleBtnAccept}</button>
              <button type="button" className="confirm-dialog-btn confirm-dialog-btn-cancel" onClick={onCancel}>{titleBtnCancel}</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ConfirmDialog;