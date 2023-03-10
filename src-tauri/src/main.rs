// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::{Utc, Local, NaiveDateTime};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn curr_time() -> String {
    let now = Utc::now();
    return now.format("%Y-%m-%d %H:%M:%S").to_string();
}

#[tauri::command]
fn curr_time_unix() -> i64 {
    let now = Local::now();
    now.timestamp()
}

#[tauri::command]
fn timestamp_convert(unix: i64) -> String{
    // let n = unix.parse::<i64>().unwrap();
    let t = NaiveDateTime::from_timestamp_millis(unix);

    t.unwrap().format("%Y-%m-%d %H:%M:%S").to_string()
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,curr_time,curr_time_unix,timestamp_convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
