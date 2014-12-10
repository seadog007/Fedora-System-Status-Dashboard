#!/bin/bash

# Set the timer
timer=3600
max=3600
# Update yum /pdate list about every 1 hour.
# And first time it will get list too.

while true
	do

	# Begin
	out="{"

	# Disk
	out=$out"\"Disk\":"`df -h | grep '^/dev' | awk 'BEGIN {printf("[")}; {printf("[\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"],", $1, $2, $3, $4, $5)}; END {printf("]")}' | sed 's/,]$/]/'`
	out=$out","

	# TIME
	out=$out"\"Time\":"`echo "\"\`date +"%Y/%m/%d %H:%M:%S %z"\`\""`
	out=$out","

	# 不重複User
	out=$out"\"Users\":"`who | awk '{print $1}'| sort -u | awk 'BEGIN {printf("[")}; {printf("\"%s\",",$1)} END {printf("]")};' | sed "s/,]$/]/"`
	out=$out","

	# Uptime
	out=$out"\"Uptime\":"`echo "[\"\`uptime | sed "s/,/\",\"/g" | sed "s/load average://" | sed "s/users//" | sed "s/\ //g" | sed "s/,/\\",\\"/g" \`\"]"`
	out=$out","

	# Network
	out=$out"\"Network\":"`sar -n DEV 1 1 | tail -n \`ip -o addr | awk '{print $2}' | sed "s/://g" | sort -u | wc -l\` | awk 'BEGIN {printf("[")}; {$1=""; printf("[\"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\"],",$2,$3,$4,$5,$6,$7,$8)} END {printf("]")};' | sed "s/],]$/]]/"`
	out=$out","

	# CPU
	out=$out"\"CPUs\":"`sar 1 1 | tail -n 1 | awk 'BEGIN {printf("[")}; {$1=""; $2=""; printf("%s",$0)} END {printf("]")}' | sed "s/\ /\",\"/g" | sed "s/\",\"\",//" | sed "s/\]/\"\]/"`
	out=$out","

	# Top 10 CPU process
	out=$out"\"Process_10T_CPU\":"`ps -eo pid,%cpu,fuser,comm --sort -%cpu | head -n 11 | tail -n 10 | awk 'BEGIN {printf("[")}; {printf("[\"%s\", \"%s\", \"%s\",\"%s\"],",$1,$2,$3,$4)} END {printf("]")}' | sed "s/],]$/]]/"`
	out=$out","

	# Top 10 Memory process
	out=$out"\"Process_10T_Mem\":"`ps -eo pid,%mem,fuser,comm --sort -%mem | head -n 11 | tail -n 10 | awk 'BEGIN {printf("[")}; {printf("[\"%s\", \"%s\", \"%s\",\"%s\"],",$1,$2,$3,$4)} END {printf("]")}' | sed "s/],]$/]]/"`
	out=$out","

  # Last Error
  out=$out"\"Lasterror\":"`dmesg | grep -E 'Error|error' | tail -n 1`
  out=$out","

  # Last Warning
  out=$out"\"Lasterror\":"`dmesg | grep -E 'Warning|warning' | tail -n 1`
  out=$out","

	# Yum update
	if [ $timer -eq $max ]
	then
		echo "Getting Update List, Please wait."
		timer=0
		yum=`yum check-update | grep 'updates' | awk 'BEGIN {printf("[")}; {printf("[\"%s\",\"%s\",\"%s\"]",$1,$2,$3)}; END {printf("]")}' | sed "s/\]\[/\],\[/g"`
	else
		((timer++))
	fi
	out=$out"\"Update\":"$yum

	# End
	out=$out"}	"

	# Echo all data to file
	echo "Writing the data into the json file"
	echo $out > data.json
done
