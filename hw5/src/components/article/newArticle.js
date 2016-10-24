import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addArticle} from './articleActions'

export const NewArticle = ({dispatch})=> {

    let newArticleText
    let newArticleImage
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
                            <button className="btn" onClick = { ()=>{dispatch(addArticle(newArticleText.value, newArticleImage.value))
                                newArticleText.value = ''
                                newArticleImage.value = '' 
                            }}>Post</button>
                            <button className="btn right" onClick = {()=>{newArticleText.value = ''; newArticleImage.value=''}}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default connect()(NewArticle)