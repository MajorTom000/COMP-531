import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const NewArticle = ({dispatch})=> {

    let newArticleText;
    let newArticleImage;

    return (
        <div className="row">
            <div className="col s12 m12">
                <div className="card light-grey darken-1">
                    <div>
                        <div className="card-content black-text">
                            <textarea id="post" ref={(node)=>newArticleText = node}></textarea>
                            <div className="file-field input-field">
                                <div className="btn"><span>Update Profile Image</span><input type="file"/></div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"  ref={(node)=>newArticleImage = node}/>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <a >Post</a>
                            <a onClick = {()=>{newArticleText.value = ''; newArticleImage.value=''}}>Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

NewArticle.PropTypes = {

}

export default connect()(NewArticle)