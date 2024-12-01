

function Footer(){
    const span={
        left:'9%',
        marginLeft: '80vw',
        position: 'absolute',
        fontSize: '0.8vw',
        color: 'rgb(0, 0, 255)'
    }

    const footerdiv={
        display: 'flex',
        backgroundColor: '#ececec',
        height: '8%',
        fontFamily: 'Arial, Helvetica, sans-serif',
        width: '100%',
        alignItems: 'center',
        marginTop: '15vw',
        padding: '0 2vw' ,
        position: 'fixed',
        bottom: '0',
        left: '0',
        flexDirection: 'row-reverse'
    }

    return(
        <div className="footer" style={footerdiv}>
            <span style={span}><b >Debuggers</b> - &copy; 2024</span>
        </div>
    );
}

export default Footer;