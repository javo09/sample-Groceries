var dialogsModule = require("ui/dialogs");

var UserViewModel = require("../../shared/view-models/user-view-model");
var user = new UserViewModel({
    email: "username@domain.com",
    password: "password"
});
//var user = new UserViewModel();
// exports.signIn = function() {
//     user.login();
// };
exports.signIn = function() {
    user.login()
        .catch(function(error) {
            console.log(error);
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
        });
};

var frameModule = require("ui/frame");
var page, email;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = user;
};

exports.register = function() {
  var topmost = frameModule.topmost();
  topmost.navigate("views/register/register");
};
