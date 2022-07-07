import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createProject} from '../../store/actions/projectActions'

import './workform.css';


class WorkForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            workName: '',
            dateAccepted: '',
            paid: false,
            status: false,
            price: '',
            review: false,////////////////////////////////////////
        } 

        // This initial values are just for testing
    }


    handleChange = event => {
        let {value, name} = event.target
        if (value !== 'true' && value !== 'false'){
            this.setState({[name] : value})
        }
        else if ( value === 'true' || value === 'false'){
            this.setState({[name]: JSON.parse(value)})
        }
    }

    handleSubmit =  (event) => {
        event.preventDefault()
        const {workName, dateAccepted, paid, status, price, review } = this.state
        if(this.props.auth.uid){
            // If the user is signed in 
            if(workName !== '' && dateAccepted !== '' && price !== ''){
                // If the form fields are entered 
                this.props.createProject({...this.state})

                // In case i encounter problems with the messing up of the paid and status part of the form and database, this is where i might have to fix it  

                this.setState({workName: '', dateAccepted: '', price: '', review: false});
                //this.setState({workName: '', dateAccepted: '', paid: false, status: false, price: '', review: false});
            }
            else{
                // If the form fields are not entered
                alert("Please enter the requisite field data")
            }

        }
        else{
            // If the user is not signed in 
            alert("Please sign in or create an account if you don't have any yet")
        }

    }

    render() {
        return(
            <div className = 'enter-work'>
            <form className = 'work' onSubmit = {this.handleSubmit}>
                <div className = 'work-input'>
                <div className = 'form-options'>Enter job name </div>
                    <input 
                    className = 'work-name enter'
                    type = 'text'
                    name = 'workName'
                    value = {this.state.workName}
                    onChange = {this.handleChange}
                    />
                </div>

                <div className = 'date-input'>
                <div className = 'form-options'>Date </div>
                    <input 
                    className = 'date enter'
                    type = 'date'
                    name = 'dateAccepted'
                    value = {this.state.dateAccepted}
                    onChange = {this.handleChange}
                    />
                </div>

                <div className = 'paid-input'>
                    <div className = 'form-options '>Paid?</div>
                    <select className = 'paid enter'  name = 'paid' onChange = {this.handleChange}>
                        <option value = {false}> No </option>
                        <option value = {true}> Yes </option>
                    </select>
                </div>

                <div className = 'status-input'>
                    <div className = 'form-options'>Status</div>
                    <select className = 'status enter'  name = 'status' onChange = {this.handleChange}>
                        <option value = {false}>In Progress</option>
                        <option value = {true}>Done</option>
                    </select>
                </div>

                <div className = 'price-input'>
                    <div className = 'form-options'>Price</div>
                    <div>
                        <span className = 'dollar'>$</span>
                        <input 
                        className = 'price enter'
                        type = 'number'
                        name = 'price'
                        value = {this.state.price}
                        onChange = {this.handleChange}
                        />
                    </div>
                </div>
    
                <div className = 'button'>
                    <button className = 'btn' type = 'submit'>
                        Enter
                    </button>
                </div>

            </form>
        </div>               
        )
    }
}


const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkForm)


/*
            workName: 'Butterfly Effect',
            dateAccepted: '02/06/2019',
            paid: false,
            status: false,
            price: 2,
            review: false,
*/



/*
event.preventDefault();
        const {workName, dateAccepted, price, status, paid, review} =this.state;
        const {currentUser} = this.props
        
        // This should only fire if the user is signed in
        if (currentUser){
            let ID = currentUser.id // Had to use ID instead of id to avoid confusion

            let randomNum = () => {
                let rand = () => {
                    return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1)
                }
                return rand() + rand() + rand() + rand() 
            } 
            let randomID = randomNum()

            if(workName !== '' && dateAccepted !== '' && price !== ''){
                
                let timeCreated = Date.now()
                
                // This adds the data to the firestore database
                await addData(this.state, ID, randomID, timeCreated)//

                // gets added data to the app
                const userRef = await getData(ID)
                userRef.onSnapshot(snapshot => {
                    let dataArray = snapshot.data().dataObject
                    let arrange = []
                    dataArray.forEach(el => {
                    arrange.push(el.timeCreated)
                    });
                    arrange.sort((a,b) => {
                        if (a > b) return -1;
                        if(a < b) return 1;
                        return 0
                    })

                    dataArray.forEach(el => {
                    arrange.forEach(element => {
                        let theIndex = arrange.indexOf(element)
                        if (element == el.timeCreated){
                        arrange.splice(theIndex, 1, el)
                        }
                    });
                    });

                    this.props.setData(arrange)
                })

                this.setState({workName: '', dateAccepted: '', paid: false, status: false, price: ''});
            }
            else{
                // Send error message that data entered is inconclusive
                alert('Ensure that the requisite data was entered ')
            }
        }
        else{
            alert("Please sign in or create an account if you haven't already")
        } 
*/