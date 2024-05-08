use std::io::Read; 

fn what_number(chars: Vec<char>, forward: bool) -> i32 {

    // text numbers
    let text_numbers = vec!["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];   

    for (i, _char) in chars.iter().enumerate() {
        let text_chunk: String;
        
        if forward {
            text_chunk = chars[i..].iter().collect();
        } else {
            text_chunk = chars[0..i+1].iter().collect();
        }
        
        for (j, text_number ) in text_numbers.iter().enumerate() {
            if text_chunk == *text_number {
                return j as i32 + 1;
            }
        }
    }
    return -1;

}

fn main() {

    // get parameter
    let args: Vec<String> = std::env::args().collect();
    let filename = &args[1];

    let mut file = std::fs::File::open(filename).unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    
    let mut total: i32 = 0;

    for line in contents.lines() {
  
        let mut number: i32 = 0;

        // find first number in forward mode
        let mut chars = vec![];
        for (_i, char) in line.chars().enumerate() {
            if char.is_numeric() {
                number = char.to_digit(10).unwrap() as i32 * 10;
                break;
            } else {
                chars.push(char);
                let new_number = what_number(chars.clone(), true);
                if new_number != -1 {
                    number = new_number * 10;
                    break;
                }
            }
        }

        // find first number in backward mode
        let mut chars = vec![];
        for (_i, char) in line.chars().rev().enumerate() {
            if char.is_numeric() {
                number = number + char.to_digit(10).unwrap() as i32;
                break;
            } else {
                let mut check: Vec<char> = vec![char];
                check.append(&mut chars);
                chars = check;
                let new_number = what_number(chars.clone(), false);
                if new_number != -1 {
                    number = number + new_number;
                    break;
                }
            }  
        }

        println!("number {} given by: {} ",number, line);
        total = total + number;
    }
    
    println!("Total: {}", total);

}
