import sublime, sublime_plugin
import os, subprocess

class HtmlIncluderCommand(sublime_plugin.TextCommand):
    def run(self, edit, **args):
        #print (args["buildtype"])

        ## save file
        self.view.run_command("save")

        ## path
        thisPackageFile = __file__
        thisPackagePath = os.path.dirname(thisPackageFile)
        thisFileName = self.view.file_name()
        thisFileDir = os.path.dirname(thisFileName)

        ## show output pannel
        panel = self.view.window().create_output_panel('myOutput')
        panel.assign_syntax("Packages/Text/Plain text.tmLanguage")
        panel.set_read_only(False)
        panel.insert(edit, 0, "HTML-Includer run! \n")

        ## subprocess run cmd
        if args["buildtype"] == "file" :
            cmd = "node \"" + thisPackagePath + "\\index.js\" -file \"" + thisFileName + "\""
        elif args["buildtype"] == "dir" and sublime.ok_cancel_dialog("构建当前文件所在目录下的所有文件?","确认") :
            cmd = "node \"" + thisPackagePath + "\\index.js\" -dir \"" + thisFileDir + "\""
        else :
            return

        ## run cmd
        output_lines = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE, startupinfo=None, env=None, shell=True).stdout
        for line in output_lines:
            line = line.strip().decode("utf-8")
            print (line)
            panel.insert(edit, panel.size(), line + "\n")
        
        panel.set_read_only(True)
        self.view.window().run_command('show_panel', { 'panel': 'output.myOutput' })
        
        # self.view.window().run_command("show_panel", {"panel": "console"})
