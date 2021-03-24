from datetime import datetime
import os
import subprocess 
import logging 
from multiprocessing import Process

LOG_PATH = "SYMP/Storage/Logs"

class MinorTest:
    def __init__ (self, test_name, parameters=None):
        self.test_name = test_name
        self.start_time = datetime.now()
        self.finish_time = None
        self.log_path = LOG_PATH + "/"+ test_name +".log"
        self.parameters = parameters
         
    def get_test_name(self):
        return self.test_name

    def get_start_time(self):
        return self.start_time

    def get_finish_time(self):
        return self.finish_time     

    def get_log_path(self):
        return self.log_path 

    def get_parameters(self):
        return self.parameters 

    def set_finish_time(self):
        self.finish_time = datetime.now()        
         
    def activate(self):
        array_to_run = [self.test_name]
        if self.parameters is not None :
            array_to_run.append(self.parameters)
        run_command = subprocess.Popen (array_to_run, stdout= subprocess.PIPE, stderr = subprocess.PIPE)
        self.set_finish_time()
        the_result, err = run_command.communicate() 
        the_result = the_result.strip().decode()
        print (the_result)
        result_array = the_result.split("\r\n")
        #print(result_array)
        self.logs(result_array)

    def logs(self,test_result_array):
        for i in range (0,len(test_result_array)):
            logging.basicConfig(format='[INFO] : %(asctime)s - %(message)s', level = logging.INFO, filename = self.log_path, filemode='w') 
            logging.info(test_result_array[i])



        
        

