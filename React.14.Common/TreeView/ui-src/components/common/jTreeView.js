import React, {Component} from 'react';
import lodashGet from 'lodash/object/get';

let TreeRootSty = {lineHeight: '120%'}
let liSty = {listStyleType: 'none'};
let ulSty = {height: 'inherit', WebkitPaddingStart: '16px'};
let ulStyle = {height: 'inherit', WebkitPaddingStart: '16px'};
let iconSty = {marginRight: '10px', width: '16px'};
let titleSty = {color: '#afac87', marginTop: '2px'};

let nottogglable = {
	color: '#FFF',
	cursor: 'pointer',
	margin: '0 0 0 .8em'
};

let togglable = {
	color: '#815C7C',
	cursor: 'pointer',
	margin: '0'
};

let options = {};

let getTreeNode = function(child, index) {
	return <li key={index} style={liSty}><JTreeViewNode node={child} iconClick={this.props.iconClick} titleClick={this.props.titleClick} /></li>;
};

class JTreeViewNodeRender extends Component {
	render() {
		let childNodes;
		let pSty = nottogglable;
		let titleColor = '';
		if (this.props.node.children && this.props.node.children.length > 0) {
			childNodes = this.props.node.children.map(getTreeNode, this);
			titleColor = this.props.node.selected ? '#7BB53B' : '#AF90A5';
		} else {
			titleColor = this.props.node.selected ? '#b58900' : '#afac87';
		}

		let isClosed = true;
		if (this.props.node.closed != null) isClosed = this.props.node.closed;

		let branch = (
			<ul id='ulStyle' style={ulStyle}>
				{childNodes}
			</ul>
		)
		if (isClosed) branch = null;

		let props = this.props;
		let iconType = lodashGet(props, options.typeName);
		if (iconType == options.icon.sun) iconSty.background = "url('./img/sun.ico') 0/16px no-repeat !important";
		else if (iconType == options.icon.leaf) iconSty.background = "url('./img/leaf.ico') 0/16px no-repeat !important";
		else if (iconType == options.icon.snow) iconSty.background = "url('./img/snow.ico') 0/16px no-repeat !important";
		else iconSty.background = "url('./img/sun.ico') 0/16px no-repeat !important";

		let titleElementBase = (<span>{this.props.node.title}</span>);
		let titleElement;

		switch (titleColor) {
			case '#7BB53B': titleElement = React.cloneElement(titleElementBase, {style: {color: '#7BB53B'}}); break;
			case '#AF90A5': titleElement = React.cloneElement(titleElementBase, {style: {color: '#AF90A5'}}); break;
			case '#b58900': titleElement = React.cloneElement(titleElementBase, {style: {color: '#b58900'}}); break;
			case '#afac87': titleElement = React.cloneElement(titleElementBase, {style: {color: '#afac87'}}); break;
		}

		return (
			<div id='TreeNode'>
				<div id='pSty' style={pSty} className='FlexBox'>
					<div id='iconSty' onClick={this.iconHandler} style={iconSty}>&nbsp;</div>
					<div id='titleSty' onClick={this.clickHandler} style={titleSty} >
						{titleElement}
					</div>
				</div>
				{branch}
			</div>
		);
	}
}

class JTreeViewNode extends JTreeViewNodeRender {
	iconHandler = () => {
		if (this.props.node.children && this.props.node.children.length > 0) {
			this.props.iconClick(this.props.node);
		} else {
			this.clickHandler();
		}
	}
	clickHandler = () => { this.props.titleClick(this.props.node); }
}

export default class JTreeView extends Component {
	render() {
		options = this.props.options;
		let childNodes = this.props.data.map(getTreeNode, this);
		return (
			<div id='TreeRootSty' style={TreeRootSty}>
				<ul id='ulSty' style={ulSty}>
						{childNodes}
				</ul>
			</div>
		);
	}
}
