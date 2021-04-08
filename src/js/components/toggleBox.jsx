import React, { Component } from "react";
import '../../style/index.css';

class ToggleBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var {children } = this.props;
		const { opened } = this.state;

		return (
				<div className="box">
			
					{opened && (					
						<div>
							{children}
						</div>
					)}
				</div>
		);
	}
}

export default ToggleBox;