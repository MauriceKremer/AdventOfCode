package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type block struct {
	row    int
	column int
}

type guard struct {
	row       int
	column    int
	direction string
}

func main() {
	readfile, err := os.Open("input.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer readfile.Close()
	scanner := bufio.NewScanner(readfile)

	var blocks []block
	var myGuard guard

	row := 0
	var maxColumns int
	for scanner.Scan() {
		line := scanner.Text()
		lineSplit := strings.Split(line, "")
		for i := 0; i < len(lineSplit); i++ {
			if lineSplit[i] == "#" {
				fmt.Println("row", row, "column", i)
				blocks = append(blocks, block{row, i})
			} else if lineSplit[i] == "^" {
				myGuard = guard{row, i, "up"}
			} else if lineSplit[i] == "v" {
				myGuard = guard{row, i, "down"}
			} else if lineSplit[i] == "<" {
				myGuard = guard{row, i, "left"}
			} else if lineSplit[i] == ">" {
				myGuard = guard{row, i, "right"}
			}

			maxColumns = len(lineSplit)
		}
		row += 1
	}

	maxRows := row
	visited := map[string]struct{}{}
	fmt.Println(myGuard)
	for !(outOfBounds(myGuard, maxRows, maxColumns)) {
		myGuard = move(myGuard, blocks)
		visited[strconv.Itoa(myGuard.row)+"-"+strconv.Itoa(myGuard.column)] = struct{}{}
		fmt.Println(myGuard)
	}
	fmt.Println("out of bounds", myGuard, maxRows, maxColumns)

	fmt.Println(len(visited) - 1)
}

func outOfBounds(g guard, row int, column int) bool {
	if g.row < 0 || g.row >= row || g.column < 0 || g.column >= column {
		return true
	}
	return false
}

func move(g guard, blocks []block) guard {

	nextGuard := guard{g.row, g.column, g.direction}

	if nextGuard.direction == "up" {
		nextGuard.row -= 1
	} else if nextGuard.direction == "down" {
		nextGuard.row += 1
	} else if nextGuard.direction == "left" {
		nextGuard.column -= 1
	} else if nextGuard.direction == "right" {
		nextGuard.column += 1
	}

	if collision(nextGuard, blocks) {
		fmt.Println("collision")
		if g.direction == "up" {
			g.direction = "right"
		} else if g.direction == "down" {
			g.direction = "left"
		} else if g.direction == "left" {
			g.direction = "up"
		} else if g.direction == "right" {
			g.direction = "down"
		}
		g = move(g, blocks)
		return g
	}

	return nextGuard
}

func collision(g guard, blocks []block) bool {
	for _, b := range blocks {
		if b.row == g.row && b.column == g.column {
			return true
		}
	}
	return false
}

//low 4730
