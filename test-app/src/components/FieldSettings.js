import React from "react";

class FieldSettings extends React.Component {
    render () {
        return (
            <form onSubmit={this.props.handleSettings}>
                <div>
                    Enter the field size
                </div>
                <div>
                    <input type="text" placeholder="width" name="w"></input>
                    <span>{" X "}</span>
                    <input type="text" placeholder="hight" name="h"></input>
                </div>
                <div>
                    <span>Choose the difficulty </span>
                    <select name="d" defaultValue={this.props.defDifclt}>
                        <option value={10}>Beginner</option>
                        <option value={15}>Normal</option>
                        <option value={20}>Hard</option>
                        <option value={25}>Proffesional</option>
                    </select>
                </div>
                <button type="submit">Let's Go</button>
            </form>
        )
    }
}

export default FieldSettings