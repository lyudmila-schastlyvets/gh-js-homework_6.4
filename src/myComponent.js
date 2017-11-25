import React, { Component } from 'react';

export default class MyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            health: this.props.parametersInit.health || 80,
            happiness: this.props.parametersInit.happiness || 50,
            satiety: this.props.parametersInit.satiety || 30,
            fatigue: this.props.parametersInit.fatigue || 50,
            currentImage: require('./images/normal.gif'),
            message: '',
            timeout: 0,
            healthColor: '',
            happinessColor: '',
            satietyColor: ''
        }

        this.healthStatus = this.healthStatus.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
        this.eat = this.eat.bind(this)
        this.walk = this.walk.bind(this)
        this.sleep = this.sleep.bind(this)
        this.updateParameters = this.updateParameters.bind(this)
        this.welcome = this.welcome.bind(this)
        this.normal = this.normal.bind(this)
        this.updateColor = this.updateColor.bind(this)
        this.disableBtn = this.disableBtn.bind(this)
        this.enableBtn = this.enableBtn.bind(this)
        this.eatClick = this.eatClick.bind(this)
        this.sleepClick = this.sleepClick.bind(this)
        this.walkClick = this.walkClick.bind(this)
    }

    componentDidMount() {
        this.disableBtn()
        this.updateStatus()
        this.updateColor()
        this.welcome()
        setTimeout(function () {
            this.normal()
        }.bind(this), 4000)
        setTimeout(function () {
            this.enableBtn()
        }.bind(this), 4000)
    }

    welcome() {
        this.updateParameters('message', "Hello! My name is Tamagotchi, I will be your pet")
        this.updateParameters('currentImage', require('./images/saluting.gif'))
    }

    normal() {
        this.updateParameters('currentImage', require('./images/normal.gif'))
    }

    disableBtn() {
        for (var btn = document.getElementsByTagName('button'), j = 0, lj = btn.length; j < lj; j++)
            btn[j].disabled = true
        console.log('btn')
    }

    enableBtn() {
        for (var btn = document.getElementsByTagName('BUTTON'), j = 0, lj = btn.length; j < lj; j++)
            btn[j].disabled = false
    }

    eat() {
        if (this.state.satiety < 80) {
            this.updateParameters('message', "Om Nom Nom")
            this.updateParameters('currentImage', require('./images/eat.gif'))
            this.updateParameters('satiety', this.state.satiety + 20)
            this.updateParameters('fatigue', this.state.fatigue + 20)
        }
        else {
            this.updateParameters('message', "I do not want to eat now")
        }
    }

    walk() {
        var random = Math.floor(Math.random() * (100 - 1))
        if (random <= 5) {
            alert("Ohh A large balcony fell on your pet, He is dead! Game will restart")
            window.location.reload()
        }
        else {
            this.disableBtn()
            this.updateParameters('currentImage', require('./images/image049.gif'))
            this.updateParameters('message', "YaHoo! So interesting and I am steel alive")
            this.updateParameters('happiness', this.state.happiness + 10)
            this.updateParameters('satiety', this.state.satiety - 20)
            this.updateParameters('fatigue', this.state.fatigue - 20)
            if (this.state.satiety >= 10) {
                var i = 4
                var int = setInterval(function () {
                    if (i > 0) {
                        i--
                    } else {
                        this.updateParameters('currentImage', require('./images/image029.gif'))
                        clearInterval(int)
                        this.enableBtn()
                    }
                }.bind(this), 1000)
            }
            if (this.state.satiety < 40) {
                this.updateParameters('message', "I want eat now")
            }
            else if (this.state.fatigue < 20) {
                this.updateParameters('message', "I'm very tired, I want to sleep")
            }
        }
    }

    sleep() {
        if (this.state.fatigue < 50) {
            this.disableBtn()
            this.updateParameters('currentImage', require('./images/sleep.gif'))
            var i = 10
            var int = setInterval(function () {
                    if (i > 0) {
                        this.updateParameters('message', "Wait until I'm sleeping " + i + " seconds")
                        i--
                    } else {
                        this.updateParameters('message', "I am with you again")
                        this.updateParameters('currentImage', require('./images/normal.gif'))
                        clearInterval(int)
                        this.enableBtn()
                    }
                }.bind(this), 1000)
        }
        else {
            this.updateParameters('message', "I don't want sleep now! go for walk with me!")
        }
    };

    healthStatus() {
        if (this.state.health < 10 || this.state.satiety < 10) {
            alert("WASTED")
            window.location.reload()
        }
    }

    updateParameters(value, param) {
        this.setState({
            [value]: param
        })
    }

    updateColor() {
        if (this.state.satiety <= 10){
            this.state.satietyColor = '#FF5722'
        }
        else if (this.state.satiety <= 30){
            this.state.satietyColor = '#FF9800'
        }
        else this.state.satietyColor = '#4CAF50'

        if (this.state.health <= 10){
            this.state.healthColor = '#FF5722'
        }
        else if (this.state.health <= 30){
            this.state.healthColor = '#FF9800'
        }
        else this.state.healthColor = '#4CAF50'

        if (this.state.happiness <= 10){
            this.state.happinessColor = '#FF5722'
        }
        else if (this.state.happiness <= 30){
            this.state.happinessColor = '#FF9800'
        }
        else this.state.happinessColor = '#4CAF50'
    }

    eatClick() {
        clearTimeout(this.normal())
        this.disableBtn()
        this.eat()
        setTimeout(function(){this.normal()}.bind(this), 9000)
        setTimeout(function(){this.enableBtn()}.bind(this), 9000)
    }

    sleepClick() {
        clearTimeout(this.normal())
        this.disableBtn()
        this.sleep()
        setTimeout(function(){this.normal()}.bind(this), 10*1000)
        setTimeout(function(){this.enableBtn()}.bind(this), 10*1000)
    }

    walkClick() {
        clearTimeout(this.normal());
        this.disableBtn();
        this.walk();
        this.updateStatus();
        this.updateColor();
        setTimeout(function(){this.normal()}.bind(this), 8200)
        setTimeout(function(){this.enableBtn()}.bind(this), 8200)
    }

    updateStatus() {
        return (
            <div className="information">
                {this.healthStatus()}
                {this.updateColor()}
                <div className="col-md-4" id="health" style={{color: this.state.healthColor}}>Health<br/>{this.state.health}</div>
                <div className="col-md-4" id="satiety" style={{color: this.state.satietyColor}}>Satiety<br/>{this.state.satiety}</div>
                <div className="col-md-4" id="happiness" style={{color: this.state.happinessColor}}>Happiness<br/>{this.state.happiness}</div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.updateStatus()}
                <div className="animation">
                    <img src={this.state.currentImage || require('./images/normal.gif')} alt=""/>
                </div>
                <div className="message">
                    <p>{this.state.message}</p>
                </div>
                <div className="controls">
                    <button id="eat" onClick={this.eatClick}>Eat</button>
                    <button id="walk" onClick={this.walkClick}>Walk</button>
                    <button id="sleep" onClick={this.sleepClick}>Sleep</button>
                </div>
            </div>
        )
    }
}