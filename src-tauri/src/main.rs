// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // Esto llama a la función run() que está en tu archivo lib.rs
    sententiadiei_lib::run()
}