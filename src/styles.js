module.exports = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        backgroundImage: 'url(https://i.pinimg.com/originals/ea/80/e8/ea80e8bcf70c0a180cdc6905afb3f1c1.jpg)'
    },

    //Sidebar
    menuPanel: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        backgroundColor: 'dodgerblue',
        flex: 2,
        color: 'white'
    },
    avatarAndName: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: '20px',
        wordBreak: 'break-all'
    },
    avatar: {
        width: 180,
        height: 171,
        objectFit: 'cover'
    },
    //Topbar
    navBarHorizontal: {
        width: "100%",
        position: 'absolute',

    },
    navBarHorizontalItem: {
        width: '100%',
        flex: 1
    },
    navBarVertical: {

    },
    navBarVerticalItem: {
        width: '100%',
        color: 'white',
    },

    //Content
    contentPanel: {
        marginTop: '24px',
        padding: '1% 1% 0 1%',
        flex: 9,
        // backgroundColor: '#FFFFFF'
    },
    
    contentBox: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 9
    },

    listItem:{
        padding:'5px',
        margin:'1%',
        minWidth:'45%',
        maxWidth:'45%',
        flexDirection:'column',
        fontFamily: 'monospace',
        fontSize: '15px',
        boxShadow: "1px 1px 2px #111111"
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex'
    }
};