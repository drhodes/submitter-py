
function log(msg) {
    console.log("submitter: " + msg);
}


class SubmitButton {
    constructor() {
        this.labName = IPython.notebook.notebook_name;                            
        this.buildButton();
    }
    
    // https://jakevdp.github.io/blog/2013/06/01/ipython-notebook-javascript-python-communication/
    handleErrors(out_type, out){
        log("handleErrors called");
        log(out_type);
        log(out);
        var rsp = null;
        alert(out);
        
        // if output is a print statement
        if(out_type == "stream"){
            rsp = out.data;
        }
        
        // if output is a python object
        else if(out_type === "pyout"){
            rsp = out.data["text/plain"];
        }
        
        // if output is a python error
        else if(out_type == "pyerr"){
            rsp = out.ename + ": " + out.evalue;
        }
        
        // if output is something we haven't thought of
        else{
            rsp = "[out type not implemented]";   
        }
        log(rsp);
    }

    alertModal(msg) {
        // https://www.stefaanlippens.net/jupyter-notebook-dialog.html
        require(
            ["base/js/dialog"], 
            function(dialog) {
                dialog.modal({ title: 'submit status',
                               body: msg,
                               buttons: {'ok': {}}
                             });
            }
        );
    }
    
    submitAnswers(){
        const cmd = `import submitter; submitter.submit_from_js('${this.labName}', locals())`;
        log(cmd);
        var kernel = IPython.notebook.kernel;
        log("kernel");
        var callbacks = {'output' : this.handleErrors};
        var msg_id = kernel.execute(cmd, callbacks, {silent:false});        
        log(msg_id);
    }
    
    buildButton() {
        const button = this;
        log("buildButton called");
        // https://jakevdp.github.io/blog/2013/06/01/ipython-notebook-javascript-python-communication/
        if($(IPython.toolbar.selector.concat(' > #submit-answers')).length == 0){            
            IPython.toolbar.add_buttons_group([
                {
                    'label'   : 'Submit',
                    'icon'    : 'fa fa-angle-double-down',
                    'callback': _=> {
                        // restart the kernel.
                        IPython.notebook.kernel.restart();
                        log("kernel restarted.");
                        
                        $(IPython.events).one('kernel_ready.Kernel', _=> {                            
                            // run all the cells.
                            IPython.notebook.execute_all_cells();
                            log("executed all cells in: " + button.labName);
                            
                            button.labName = IPython.notebook.notebook_name;                            
                            // then submit the answers.
                            button.submitAnswers();
                        });
                    }
                }
            ], 'submit-answers');
        }
    }
}

new SubmitButton();

