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

  # Memory
    # $('#ov2')
  out=$out`echo "\"\`free | head -n 2 | tail -n 1 | sed -r "s/[ ]+/,/g" | sed "s/:,/\\\\":\[/"\`]"`
	out=$out","

  # Disk
    # $('#ov3')
    # $('#Disktable')
	out=$out"\"Disk\":"`df | grep '^/dev/s' | tac | awk 'BEGIN {printf("[")}; {printf("[\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"],", $1, $2, $3, $4, $5)}; END {printf("]")}' | sed 's/,]$/]/'`
	out=$out","

  # Swap
    # $('#ov4')
  out=$out`echo "\"\`free | tail -n 1 | sed -r "s/[ ]+/,/g" | sed "s/:,/\\\\":\[/"\`]"`
  out=$out","

	# TIME
    # $('#Time')
    # $('#Time2')
	out=$out"\"Time\":"`echo "\"\`date +"%Y/%m/%d %H:%M:%S %z"\`\""`
	out=$out","

	# 不重複User
    # $('#OnlineUser')
	out=$out"\"Users\":"`who | awk '{print $1}'| sort -u | awk 'BEGIN {printf("[")}; {printf("\"%s\",",$1)} END {printf("]")};' | sed "s/,]$/]/"`
	out=$out","

	# Uptime
    # $('#Uptime')
	out=$out"\"Uptime\":"`echo "[\"\`uptime | sed "s/load\ average://" | sed "s/users//" | sed "s/\ //g" | sed "s/,/\\\",\\\"/g"\`\"]"`
	out=$out","

	# Network
    # $('#net')
	out=$out"\"Network\":"`sar -n DEV 1 1 | tail -n \`ip -o addr | awk '{print $2}' | sed "s/://g" | sort -u | wc -l\` | awk 'BEGIN {printf("[")}; {$1=""; printf("[\"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\"],",$2,$3,$4,$5,$6,$7,$8)} END {printf("]")};' | sed "s/],]$/]]/"`
	out=$out","

	# CPU
    # $('#ov1')
    # $('#CPUtable')
	out=$out"\"CPUs\":"`sar 1 1 | tail -n 1 | awk 'BEGIN {printf("[")}; {$1=""; $2=""; printf("%s",$0)} END {printf("]")}' | sed "s/\ /\",\"/g" | sed "s/\",\"\",//" | sed "s/\]/\"\]/"`
	out=$out","

	# Top 10 CPU process
    # $('#Process_10T_Mem_Table')
	out=$out"\"Process_10T_CPU\":"`ps -eo pid,%cpu,fuser,comm --sort -%cpu | head -n 11 | tail -n 10 | awk 'BEGIN {printf("[")}; {printf("[\"%s\", \"%s\", \"%s\",\"%s\"],",$1,$2,$3,$4)} END {printf("]")}' | sed "s/],]$/]]/"`
	out=$out","

	# Top 10 Memory process
    # $('#Process_10T_CPU_Table')
	out=$out"\"Process_10T_Mem\":"`ps -eo pid,%mem,fuser,comm --sort -%mem | head -n 11 | tail -n 10 | awk 'BEGIN {printf("[")}; {printf("[\"%s\", \"%s\", \"%s\",\"%s\"],",$1,$2,$3,$4)} END {printf("]")}' | sed "s/],]$/]]/"`
	out=$out","

  # Last Error
    # $('#LErr')
    # $('#Last_10_Error_Table')
    out=$out"\"LastError\":"`dmesg | grep -E 'Error|error' | tail -n 10 | tac | sed 's/\\\\/\\\\\\\\/g' | awk 'NR > 1 {printf(", ")} BEGIN {printf("[")}; {printf("\"%s\"",$0)} END {printf("]")};'`
  out=$out","

  # Last Warning
    # $('#LWar')
    # $('#Last_10_War_Table')
    out=$out"\"LastWar\":"`dmesg | grep -E 'Warning|warning' | tail -n 10 | tac | sed 's/\\\\/\\\\\\\\/g' | awk 'NR > 1 {printf(", ")} BEGIN {printf("[")}; {printf("\"%s\"",$0)} END {printf("]")};'`
  out=$out","

	# Yum update
    # $('#Updatetable')
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
	out=$out"}"

	# Echo all data to file
	echo "Writing the data into the json file"
	echo $out > data.json
done
