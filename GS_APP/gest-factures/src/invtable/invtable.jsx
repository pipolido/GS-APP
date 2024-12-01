import React from 'react';
import logofact from '../assets/Debuggers1-.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Invtable() {
    const contentStyle = {
        position: 'absolute',
        top: '15%',
        left: '25%',
        width: '70%',
        paddingBottom: '5%',
        margin: '0%',
        
    };

    const cssinput = {
        maxWidth: '50%',
    };

    const csslabel = {
        width: '15%',
        backgroundColor: '#ccc9c9',
    };

    const cssdiv = {
        justifyContent: 'space-around',
    };

    const htaxStyle = {
        maxWidth: '20%',
    };

    const btn1Style = {
        backgroundColor: '#007bff',
        margin: '4px',
    };

    const btn1HoverStyle = {
        backgroundImage: 'linear-gradient(60deg, #007bff, #5f5e26)',
    };

    const tableTitlesStyle = {
        display: 'inline-block',
        paddingTop: '1%',
        paddingBottom: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
        backgroundImage: 'linear-gradient(190deg, #5f5e26, #007bff)',
        borderRadius: '5px',
        width: '95%',
    };

    const btnnStyle = {
        paddingTop: '8px',
        paddingBottom: '8px',
        width: '4%',
        backgroundColor: '#007bff',
    };

    const borderStyle = {
        borderRight: 'solid 1px gray',
    };

    const commonTitleStyle = {
        fontWeight: '500',
    };

    const namepStyle = {
        display: 'inline-block',
        width: '45%',
        ...borderStyle,
        ...commonTitleStyle,
    };

    const prixuStyle = {
        display: 'inline-block',
        width: '15%',
        ...borderStyle,
        ...commonTitleStyle,
    };

    const prixtStyle = {
        display: 'inline-block',
        width: '15%',
        ...commonTitleStyle,
    };

    const qntStyle = {
        display: 'inline-block',
        width: '15%',
        ...borderStyle,
        ...commonTitleStyle,
    };

    const welpStyle = {
        display: 'inline-block',
        width: '95%',
    };

    const welpInputStyle = {
        marginTop: '5px',
        padding: '0.7%',
        border: 'solid 1px rgb(202, 202, 202)',
        borderRadius: '5px',
    };

    const footerStyle = {
        display: 'flex',
        backgroundColor: '#ececec',
        height: '8%',
        fontFamily: 'Arial, Helvetica, sans-serif',
        width: '100%',
        alignItems: 'center',
        marginTop: '15vw',
        padding: '0 2vw',
        position: 'fixed',
        bottom: '0',
        left: '0',
        flexDirection: 'row-reverse',
    };

    return (
        <div id="content" style={contentStyle}>
            <div id="sub_content">
                <img src={logofact} alt="Logo" width="8%" height="8%" />
                <hr />
                <div id="inp" style={cssdiv}>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" style={csslabel} id="addon-wrapping">
                            Nom du Client :
                        </span>
                        <input type="text" style={cssinput} id="inpuut" className="form-control" placeholder="physique ou morale" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                    <br />
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" style={csslabel} id="addon-wrapping">
                            Date :
                        </span>
                        <input type="date" style={cssinput} id="inpuut" className="form-control" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>
                <hr />
                <div id="tabletitles" style={tableTitlesStyle}>
                    <span id="namep" style={namepStyle}>Produit/Service : </span>
                    <span id="prixu" style={prixuStyle}>Prix Unitaire :</span>
                    <span id="qnt" style={qntStyle}>Quantite :</span>
                    <span id="prixt" style={prixtStyle}>Prix Totale :</span>
                </div>
                <button type="button" className="btn btn-success" id="btnn" style={btnnStyle}> + </button>
                <div id="line">
                    <div id="welp" style={welpStyle}>
                        <input type="text" id="prdname0" style={{ width: '45%' }} />
                        <input type="text" id="prxu0" style={{ width: '15%' }} />
                        <input type="text" id="qnntt0" style={{ width: '15%' }} />
                        <input type="text" id="prixttl0" style={{ width: '22%' }} disabled />
                    </div>
                </div>
            </div>
            <hr />
            <div id="total">
                <div className="input-group flex-nowrap" id="totdiv" style={{ justifyContent: 'flex-end', margin: '0.5%' }}>
                    <span className="input-group-text" id="addon-wrapping" style={{ backgroundColor: '#ffffff' }}>Totale HT (DH) :</span>
                    <input type="text" id="htax" style={htaxStyle} className="form-control" placeholder="0.00 DH" aria-label="Username" aria-describedby="addon-wrapping" disabled />
                </div>
                <div className="input-group flex-nowrap" id="totdiv" style={{ justifyContent: 'flex-end', margin: '0.5%' }}>
                    <span className="input-group-text" id="addon-wrapping" style={{ backgroundColor: '#ffffff' }}>Tax (%) :</span>
                    <input type="text" id="htax" style={htaxStyle} className="form-control" placeholder="0 %" aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
                <div className="input-group flex-nowrap" id="totdiv" style={{ justifyContent: 'flex-end', margin: '0.5%' }}>
                    <span className="input-group-text" id="addon-wrapping" style={{ backgroundColor: '#ffffff' }}>Totale TTC (DH) :</span>
                    <input type="text" id="htax" style={htaxStyle} className="form-control" placeholder="0.00 DH" aria-label="Username" aria-describedby="addon-wrapping" disabled />
                </div>
            </div>
            <br />
            <div id="btndiv" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <input type="submit" value="Submit" className="btn btn-secondary btn" id="btn1" style={btn1Style} />
                <input type="button" value="Print" className="btn btn-secondary btn" id="btn1" style={btn1Style} />
            </div>

        </div>
    );
}

export default Invtable;
