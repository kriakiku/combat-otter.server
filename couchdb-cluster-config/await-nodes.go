package cluster_config

import (
	"errors"
	"fmt"
	"net"
	"time"
)

func AwaitNodes(addresses []string, delay time.Duration, timeout time.Duration, check func(address string) (bool, error)) error {
	resc, errc := make(chan string), make(chan error)

	time.Sleep(delay)
	for _, address := range addresses {
		go func(address string) {
			success, err := awaitNode(address, timeout, check)
			if err != nil {
				errc <- err
				return
			}
			resc <- fmt.Sprintf("%v@%s", success, address)
		}(address)
	}

	for i := 0; i < len(addresses); i++ {
		select {
		case res := <-resc:
			fmt.Println(res)
		case err := <-errc:
			//fmt.Println(err)
			return err
		}
	}
	time.Sleep(5 * time.Second)

	return nil
}

func awaitNode(address string, timeout time.Duration, check func(address string) (bool, error)) (bool, error) {
	timeoutReached := time.After(timeout)
	tick := time.Tick(1000 * time.Millisecond)
	for {
		select {
		case <-timeoutReached:
			//fmt.Println("timeout")
			return false, errors.New(fmt.Sprintf("timeout@%s", address))
		case <-tick:
			fmt.Println(fmt.Sprintf("check@%s", address))

			ok, err := check(address)
			if err != nil {
				return false, err
			} else if ok {
				return true, nil
			}
		}
	}
}

func Available(address string) (bool, error) {
	conn, err := net.DialTimeout("tcp", address, time.Second)
	fmt.Println(address)

	if err != nil {
		fmt.Println(err1)
	}

	if err != nil {
		fmt.Println(err)
		if err, ok := err.(net.Error); ok && err.Timeout() || err.Temporary() {
			return false, nil
		}
		return false, nil
		//return false, err
	}
	defer conn.Close()
	return true, nil
}