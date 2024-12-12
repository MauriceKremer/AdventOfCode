package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer readfile.Close()
	scanner := bufio.NewScanner(readfile)

	score := 0
	for scanner.Scan() {
		line := scanner.Text()

	}

	fmt.Println(score)

}
