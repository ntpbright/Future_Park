var ReactDOM = require("react-dom");

    var currentMessage = "";
    var Helloworld = React.createClass({
      getInitialState: function(){
        var self = this;
        setInterval(function(){
            $.ajax({
                url: 'http://10.32.176.4/workshop/'
            })
            .done(function(data){
                if(data != currentMessage){
                    var oldChat = self.state.message;
                    var newChat = oldChat + '\n' + data;
                    self.setState({
                        message: newChat
                    });
                    currentMessage = data;
                }
            });
        }, 1000);

        return{
            message: 'Hello world'
        };
      },

      sendMessage: function(event){
          if(event.key === 'Enter'){
            var message = this.state.myMessage;
            var date = new Date();
            var now = date.toUTCString();
            this.setState({
                myMessage: ''
            });
            $.ajax({
                url: 'http://10.32.176.4/workshop/' + 'KANOON : ' + message + " (" + now +") "
            });
            /*Clear text in myMessage (<input />)*/
            this.refs.myMessage.value = '';
          }else{
              this.setState({
                  myMessage: event.target.value
              });
          }
      },

      render: function() {
        var Header = require('./Header.jsx');
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <Header />
                </div>
                <div className="panel-body">
                    <div id="container">
                        <textarea disabled value = {this.state.message} className = "form-control" id = "chat-list"></textarea>
                        <br/>
                        <div>
                            <input defaultValue = {this.state.myMessage} onKeyUp = {this.sendMessage} className = "form-control" ref = "myMessage"/><br/>
                            <button type = "button" className = "btn-success" >Send</button><br/>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
        );
      }
    });
    module.exports = Helloworld;
var Wrapper = require('./wrapper.jsx');
ReactDOM.render(<Wrapper/>, document.getElementById("container"));
