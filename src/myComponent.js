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
        this.welcome()
        setTimeout(function () {
            this.normal()
        }.bind(this), 4000)
        setTimeout(function () {
            this.enableBtn()
        }.bind(this), 4000)
    }

    welcome() {
        this.setState({
            message: 'Hello! My name is Tamagotchi, I will be your pet',
            currentImage: require('./images/saluting.gif')
        })
    }

    normal() {
        this.setState({
            currentImage: require('./images/normal.gif')
        })
    }

    disableBtn() {
        for (var btn = document.getElementsByTagName('button'), j = 0, lj = btn.length; j < lj; j++)
            btn[j].disabled = true
        console.log('btn')
    }

    enableBtn() {
        for (var btn = document.getElementsByTagName('button'), j = 0, lj = btn.length; j < lj; j++)
            btn[j].disabled = false
    }

    eat() {
        if (this.state.satiety < 80) {
            this.setState({
                message: 'Om Nom Nom',
                currentImage: require('./images/eat.gif'),
                satiety: this.state.satiety + 20,
                fatigue: this.state.fatigue + 20
            })
        }
        else {
            this.setState({
                message: 'I do not want to eat now'
            })
        }
    }

    walk() {
        var random = Math.floor(Math.random() * (100 - 1))
        if (random <= 5) {
            alert('Ohh A large balcony fell on your pet, He is dead! Game will restart')
            window.location.reload()
        }
        else {
            this.disableBtn()
            this.setState({
                currentImage: require('./images/image049.gif'),
                message: 'YaHoo! So interesting and I am steel alive',
                happiness: this.state.happiness + 10,
                satiety: this.state.satiety - 20,
                fatigue: this.state.fatigue - 20
            })
            if (this.state.satiety >= 10) {
                var i = 4
                var int = setInterval(function () {
                    if (i > 0) {
                        i--
                    } else {
                        this.setState({
                            currentImage: require('./images/image029.gif')
                        })
                        clearInterval(int)
                    }
                }.bind(this), 1000)
            }
            if (this.state.satiety < 40) {
                this.setState({
                    message: 'I want eat now'
                })
            }
            else if (this.state.fatigue < 20) {
                this.setState({
                    message: 'I\'m very tired, I want to sleep'
                })
            }
        }
    }

    sleep() {
        if (this.state.fatigue < 50) {
            this.disableBtn()
            this.setState({
                currentImage: require('./images/sleep.gif')
            })
            var i = 10
            var int = setInterval(function () {
                    if (i > 0) {
                        this.setState({
                            message: 'Wait until I\'m sleeping ' + i + ' seconds'
                        })
                        i--
                    } else {
                        this.setState({
                            message: 'I am with you again',
                            currentImage: require('./images/normal.gif')
                        })
                        clearInterval(int)
                    }
                }.bind(this), 1000)
        }
        else {
            this.setState({
                message: 'I don\'t want sleep now! go for walk with me!'
            })
        }
    };

    healthStatus() {
        if (this.state.health < 10 || this.state.satiety < 10) {
            alert('WASTED')
            window.location.reload()
        }
    }

    updateColor(quantity) {
        if (quantity <= 10){
            return 'red-color'
        }
        else if (quantity <= 30){
            return 'orange-color'
        }
        else
            return 'green-color'
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
        this.sleep()
        setTimeout(function(){this.normal()}.bind(this), 10*1100)
        setTimeout(function(){this.enableBtn()}.bind(this), 10*1100)
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
                <div className={this.updateColor(this.state.health)} id="health" >Health<br/>{this.state.health}</div>
                <div className={this.updateColor(this.state.satiety)} id="satiety" >Satiety<br/>{this.state.satiety}</div>
                <div className={this.updateColor(this.state.happiness)} id="happiness">Happiness<br/>{this.state.happiness}</div>
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