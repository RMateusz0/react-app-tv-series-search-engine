import React from "react";
import ShowSection from './ShowSection'
import './Header.css';

class Header extends React.Component {
    template = ""
    state = {
        inputText: '',
        finalTemplate: '',
        submitted: false
    }

    handleSubmitting = (e) => {
        this.setState({submitted:true})
        this.template = ""
        e.preventDefault()
        fetch(`https://api.tvmaze.com/search/shows?q=${this.state.inputText}`) // ${this.state.inputText}
        .then(response => response.json())
        .then(showData => this.getResults(showData))
        .catch(error => console.log(error))
    }



    getResults = (dataReady) => {
        for (let i=0 ; i < dataReady.length ; i++) {


            this.template += `
            <div class="card">
            ${  (dataReady[i].show.image)    ?   `<div><img src="${dataReady[i].show.image.medium}"></div>`  :   `<div><img src="./noimagemaze.png"></div>`    }
            <div class="title">${dataReady[i].show.name.toUpperCase()}</div>
                ${  (dataReady[i].show.genres.length !== 0)    ?   `<div class="genres">${dataReady[i].show.genres.join(" / ")}</div>`  :   ""    }
                ${  (dataReady[i].show.rating && dataReady[i].show.rating.average !== null)    ?   `<div class="rating">Rating: ${dataReady[i].show.rating.average}★</div>`  :   ""    }
                ${(dataReady[i].show.premiered) ?  `<div class="premiered">Premiered: ${dataReady[i].show.premiered}</div>`   :  ""  }
                ${(dataReady[i].show.ended) ?  `<div class="ended">Ended: ${dataReady[i].show.ended}</div>`   :  ""  }
                ${(dataReady[i].show.status && !dataReady[i].show.ended && dataReady[i].show.ended === null) ?  `<div class="status">Status: ${dataReady[i].show.status}</div>`   :  ""  }
                ${(dataReady[i].show.summary) ?  `<div class="summary">${dataReady[i].show.summary}</div>`   :  ""  }
            </div>
            `



        }

        this.setState({finalTemplate: this.template})
    }



    render() {
        return (
            <div>
                <div className="header-bar">
                    <form onSubmit={this.handleSubmitting}>
                        <input type="text"
                        placeholder="Type here"
                        value={this.state.inputText}
                        onChange={
                            (e) => {this.setState({inputText:e.target.value})}
                            } />
                        <button>Search</button>
                    </form>
                </div>
                <ShowSection finalDisplayTemplate={this.state.finalTemplate} submitted={this.state.submitted} />
            </div>
            
        )
    }
}

export default Header