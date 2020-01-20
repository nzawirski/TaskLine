const sidebarWidth = '240px'
module.exports = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        
    },

    //Sidebar
    menuPanel: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        background: 'linear-gradient(9deg, #1f66c4 20%, dodgerblue 78%)',
        flex: 2,
        color: 'white',
        position: 'fixed',
        width: sidebarWidth,
        height: '100vh',
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
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        color: 'white',
    },

    //Content
    contentPanel: {
        marginTop: '34px',
        padding: '1% 1% 0 1%',
        flex: 9,
        marginLeft: sidebarWidth,
    },
    contentPanel2: {
        marginTop: '34px',
        padding: '1% 1% 0 1%',
        flex: 9,
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
    listItemToggled:{
        padding:'5px',
        margin:'1%',
        minWidth:'45%',
        maxWidth:'45%',
        flexDirection:'column',
        fontFamily: 'monospace',
        fontSize: '15px',
        boxShadow: "1px 1px 2px #111111",
        backgroundColor: 'dodgerBlue'
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
    }
};