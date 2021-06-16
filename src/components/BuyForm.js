import React, { Component } from 'react';
import Web3 from 'web3';
import ethLogo from '../eth-icon.png';
import qoin from '../qoin.png';

class BuyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: '0',
        }
    }
    render() {
        const web3 = new Web3(window.ethereum).eth;
        return (
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault();
                let etherAmount = this.input.value.toString();
                etherAmount = web3.utils.toWei(etherAmount, 'Ether');
                this.props.buyTokens(etherAmount);
            }
            }>
                <div>
                    <label className="float-left">
                        <b>Input</b>
                    </label>
                    <span className="float-right text-muted">
                        Balance: {web3.utils.fromWei(this.props.ethBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-4">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="0"
                        onChange={() => {
                            this.setState({
                                output: (this.input.value * 100).toString(),
                            })
                        }}
                        ref={(input) => { this.input = input }}
                        required
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={ethLogo} height='32' alt="" />
                                    &nbsp;&nbsp;&nbsp; ETH
                                </div>
                    </div>
                </div>
                <div>
                    <label className="float-left"><b>Output</b></label>
                    <span className="float-right text-muted">
                        Balance: {web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
                    </span>
                </div>
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="0"
                        value={this.state.output}
                        disabled
                    />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <img src={qoin} height='32' alt="" />
                                    &nbsp; QOIN
                                </div>
                    </div>
                </div>
                <div>
                    <span className="float-left text-muted">Exchange Rate</span>
                    <span className="float-right text-muted">1 ETH = 100 QOIN</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">EXCHANGE!</button>
            </form>

        );
    }
}

export default BuyForm;
