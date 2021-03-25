import time
import threading


class MajorTest:

    def __init__(self, minor_tests):
        """
        :param minor_tests: Array of minor tests
        """
        self.minor_tests = minor_tests

    def activate(self, **kwargs):
        """
        The function will activate all minor tests that are part of one major test.
        A thread will be created for each minor test.
        :return: The time all minor tests took.
        """
        # Initialize the threads list
        threads = []

        # Create a thread for each minor test
        for min_test in self.minor_tests:
            # TODO Handle what parameters activate takes if any
            t = threading.Thread(target=min_test.activate)
            threads.append(t)
            # If threads will not work: min_test.activate(kwargs)

        # Start clock
        time.clock()

        # Start all threads
        for t in threads:
            t.start()

        # Wait until all threads are finished
        for t in threads:
            t.join()

        # Stop time
        time.clock()
        return "Finished Successfully, it took {} seconds".format(time.clock())
