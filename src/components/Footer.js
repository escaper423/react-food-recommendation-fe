import React from 'react'

const footerStyle = {
    width: '100%',
    textAlign: 'center',
    marginBottom: '200px',
}

const Footer = () => {
    return (
        <div className="footer" style={footerStyle}>
            <p>Footer</p>
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
}

export default Footer
