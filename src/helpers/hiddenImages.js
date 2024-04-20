function HiddenImages () {
    return (
        <>
            <div id="images" style={{visibility: 'hidden'}}>      
                <img id="watermakedImageWithText"/>
            </div> 
            <img id="originalImage" style={{display: 'none'}} />
            <a id="download" style={{display: 'none'}} ></a>
        </>
    );
}

export default HiddenImages;