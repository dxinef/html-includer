import sublime, sublime_plugin
import os, subprocess

class HtmlIncluderCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        ## save file
        self.view.run_command("save")

        ## path
        thisPackageFile = __file__
        thisPackagePath = os.path.dirname(thisPackageFile)
        thisfilename = self.view.file_name()
        thisfilepath = os.path.dirname(thisfilename)

        ## show output pannel
        panel = self.view.window().create_output_panel('myOutput')
        panel.set_read_only(False)
        panel.insert(edit, 0, "HTML-Includer run! \n")

        ## subprocess run cmd
        cmd = "node \"" + thisPackagePath + "\\index.js\" \"" + thisfilename + "\""
        #panel.insert(edit, panel.size(), cmd + "\n")
        output_lines = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE, startupinfo=None, env=None, shell=True).stdout
        for line in output_lines:
            line = line.strip().decode("utf-8")
            print (line)
            panel.insert(edit, panel.size(), line + "\n")
        
        panel.set_read_only(True)
        self.view.window().run_command('show_panel', { 'panel': 'output.myOutput' })
        # self.view.window().run_command("show_panel", {"panel": "console"})
