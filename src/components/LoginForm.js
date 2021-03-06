import React, {Component} from 'react';
import {Text ,TextInput} from 'react-native';
import {Button,Card,CardSection, Input, Spinner} from './common';
import firebase from 'firebase'; 

class LoginForm extends Component{
    state= {
        email : '',
        password : '',
        error: '',
        loading: false
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size='small' />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button> 
        );
    }

    onButtonPress(){
        
    const {email,password} = this.state;
    this.setState({error: '', loading: true});
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(()=>{
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }

    onLoginFail(){
        this.setState({error: 'Authentication Failed!', loading: false})
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input label="Email" placeholder="e.g: zumair@gmail.com" value={this.state.email} onChangeText={email => this.setState({email})}/>
                </CardSection>
                
                <CardSection>
                    <Input label="Password" placeholder="********" secureTextEntry value={this.state.password} onChangeText={password => this.setState({password})} />
                </CardSection>   
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
                
        );
    }
}

const styles={
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;