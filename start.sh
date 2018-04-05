#!/bin/bash
cd ~/NT
forever stop nt.js
forever start -l /home/pi/NT/log/out -p /home/pi -a -d nt.js ~/NT/