module.exports = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',

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
        backgroundColor: '#FFFFFF'
    },
    
    contentBox: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 9
    }
};