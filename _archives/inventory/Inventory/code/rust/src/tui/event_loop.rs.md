// src/tui/event_loop.rs
use std::{
    sync::mpsc::{self, Receiver, Sender},
    thread,
    time::{Duration, Instant},
};

use crossterm::event::{self, Event as CEvent};
use crate::tui::event::{Event, EventConfig, InputEvent};

pub struct EventLoop {
    rx: Receiver<Event>,
    tx_external: Sender<Event>,
}

impl EventLoop {
    pub fn new(config: EventConfig) -> Self {
        let (tx, rx) = mpsc::channel::<Event>();
        let tx_input = tx.clone();
        let tx_tick = tx.clone();

        // Input thread
        thread::spawn(move || {
            loop {
                if event::poll(Duration::from_millis(50)).unwrap_or(false) {
                    if let Ok(ce) = event::read() {
                        let ev = match ce {
                            CEvent::Key(k) => Event::Input(InputEvent::Key(k)),
                            CEvent::Mouse(m) => Event::Input(InputEvent::Mouse(m)),
                            CEvent::Resize(w, h) => Event::Input(InputEvent::Resize(w, h)),
                            _ => continue,
                        };
                        if tx_input.send(ev).is_err() {
                            break;
                        }
                    }
                }
            }
        });

        // Tick thread
        thread::spawn(move || {
            let mut last_tick = Instant::now();
            loop {
                let now = Instant::now();
                if now.duration_since(last_tick) >= config.tick_rate {
                    if tx_tick.send(Event::Tick).is_err() {
                        break;
                    }
                    last_tick = now;
                }
                thread::sleep(Duration::from_millis(10));
            }
        });

        // External channel for system messages
        let tx_external = tx;

        Self { rx, tx_external }
    }

    pub fn next(&self) -> Option<Event> {
        self.rx.recv().ok()
    }

    pub fn send_external(&self, payload: String) -> Result<(), mpsc::SendError<Event>> {
        self.tx_external.send(Event::External(payload))
    }
}
