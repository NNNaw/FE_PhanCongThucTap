import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addTopicAction } from '../../Redux/Actions/Topic.Action';

class pageAddTopic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: {
                idGV: "",
                noiDungDT: '',
                tenDeTai: '',
                tinhTrangDT: 0,

            }


        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            topic: { ...this.state.topic, [name]: value }
        }, () => {
            console.log(this.state.topic)
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            topic: { ...this.state.topic, idGV: JSON.parse(localStorage.getItem("infoUser")).idGV }
        }, () => {
            this.props.addTopic(this.state.topic)
        })
    }

    render() {
        return (
            <div className='pageAddTopic container'>

                <form className='form' onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="tenDeTai">Tên Đề Tài:</label>
                        <input type="text" onChange={this.handleChange}
                            className="form-control" id="tenDeTai" name="tenDeTai" value={this.state.topic.tenDeTai} />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="noiDungDT">Nội Dung Đề Tài:</label>
                        <textarea onChange={this.handleChange} type="text"
                            className="form-control" id="noiDungDT" name="noiDungDT" value={this.state.topic.noiDungDT} rows="4" cols="50"></textarea>
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="noiDungDT">Nội Dung Đề Tài:</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.setState({
                                    topic: {
                                        ...this.state.topic, noiDungDT: data
                                    }
                                }, () => {
                                    console.log(this.state.topic)
                                });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>

                    <input type="submit" className='btn btn-success' value='Thêm' />
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTopic: (data) => {
            dispatch(addTopicAction(data))
        }
    }
};


export default connect(
    mapStateToProps, mapDispatchToProps
)(pageAddTopic);