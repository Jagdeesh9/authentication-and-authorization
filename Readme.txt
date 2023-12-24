Cookie --->  Stored on client
Server ---> hold session

Create session --> req.session.name = value;
read session --> req.session.name;
destroy session --> req.session.destroy((err)=>{
    if(err) throw err;
});
