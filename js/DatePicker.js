/**
 * Created by Administrator on 2015/9/11.
 */
(function(){
    var selectedDate = new Array();

    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    unicorn = {
        initDate: function (y, m1, m2, m3, d, nextY, PreY, midY) {
            $("#datePicker").empty();//每次初始化表格前先清空表格
            for (var nu = 0; nu < 3; nu++) {
                var nstr = new Date(); //当前Date资讯
                var ynow = y; //年份
                var mnow;//月份
                //  console.log(ynow+":"+nstr.getFullYear())
                switch (nu) {
                    case 0:
                        mnow = m1 - 1;
                        ynow = PreY;
                        break;
                    case 1:
                        mnow = m2 - 1;

                        ynow = midY;

                        break;
                    case 2:
                        mnow = m3 - 1;

                        ynow=nextY;

                        break;
                }
                var dnow = d; //今日日期
                var n1str = new Date(ynow, mnow, 1); //当月第一天Date资讯
                var firstday = n1str.getDay(); //当月第一天星期几

                //   console.log(d);
                var m_days = new Array(31, 28 + unicorn.is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数

                var tr_str = Math.ceil((m_days[mnow] + firstday) / 7); //表格所需要行数

                var str = "";
                //打印表格第一行（有星期标志）

                //str = str + ("<table class='table-condensed'>");
                switch (nu) {
                    case 0:
                        if ((m1 - 1) == nstr.getMonth() && ynow == nstr.getFullYear()) {
                            str += "<table class='table-condensed' style='border-right: 1px solid #ddd;margin-right: 10px;padding-right: 10px;'><tr><th class='prev UnSelected'  style='visibility: visible;'> <i class='icon icon-chevron-left UnSelected'></i></th><th colspan='5' class='switch'>" + PreY + "-" + m1 + "</th><th class='next' onselectstart='return false' style='visibility: hidden;'><i class='icon-arrow-right'></i></th></tr>";

                        } else {
                            str += "<table class='table-condensed' style='border-right: 1px solid #ddd;margin-right: 10px;padding-right: 10px;'><tr><th class='prev' onclick=' unicorn.PrePage(" + ynow + "," + m1 + "," + m2 + "," + m3 + "," + d + "," + nextY + "," + PreY + "," + midY + ")' style='visibility: visible;'> <i class='icon icon-chevron-left'></i></th><th colspan='5' class='switch'>" + PreY + "-" + m1 + "</th><th class='next' onselectstart='return false' style='visibility: hidden;'><i class='icon-arrow-right'></i></th></tr>";

                        }
                        break;
                    case 1:
                        str += "<table class='table-condensed' style='border-right: 1px solid #ddd;margin-right: 10px;padding-right: 10px;'><tr><th colspan='7'  class='switch'>" + midY + "-" + m2 + "</th></tr>";
                        break;
                    case 2:

                        str += "<table class='table-condensed'><tr><th class='prev' onselectstart='return false' style='visibility: hidden;'> <i class='icon icon-chevron-right'></i></th><th colspan='5' class='switch'>" + nextY + "-" + m3 + "</th><th class='next' onclick=' unicorn.NextPage(" + ynow + "," + m1 + "," + m2 + "," + m3 + "," + d + "," + nextY + "," + PreY + "," + midY + ")' style='visibility: visible;'><i class='icon-chevron-right'></i></th></tr>";
                        break;

                }
                str += "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
                for (i = 0; i < tr_str; i++) { //表格的行
                    str = str + ("<tr>");
                    for (k = 0; k < 7; k++) { //表格每行的单元格
                        idx = i * 7 + k; //单元格自然序列号
                        date_str = idx - firstday + 1; //计算日期
                        (date_str <= 0 || date_str > m_days[mnow]) ? date_str = "" : date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的）
                        //打印日期
                        if (dnow > date_str && nu == 0 && (m1 - 1) == nstr.getMonth() || date_str=="")
                        {
                            str += "<td class='day UnSelected' >" + date_str + "</td>";

                        }
                        else if((k == 0 || k ==6))
                        {
                            str += "<td class='day weekend'>" + date_str + "</td>";
                        }

                        else {
                            str += "<td class='day'>" + date_str + "</td>";
                        }



                    }
                    str += "</tr>"; //表格的行结束
                }

                str += "</table>"; //表格结束
                $("#datePicker").append(str);

            }
            var StrBtn = "<div><span class='btn btn-link float_right' style=' margin-bottom: 2px; margin-right: 39px;margin-top: -8px;' onclick=' unicorn.EmptyTableDate()'>清空</span></div><div class='clear'></div>"
            $("#datePicker").append(StrBtn);
            $("#datePicker table").each(function () {

                $("td", this).bind("click", function () {
                    if ($(this).hasClass("active") ) {
                        selectedDate.remove($(this).closest("tbody").find(".switch").html() + "-" + $(this).html());
                        $(this).removeClass("active");
                    } else if ($(this).hasClass("UnSelected") == false) {
                        selectedDate.push($(this).closest("tbody").find(".switch").html() + "-" + $(this).html());
                        $(this).addClass("active");
                    }
                });



            });
        },
        EmptyTableDate: function () {
            selectedDate.length = 0
            unicorn.initDateTable();
        },
        initDateTable: function () {
            var nstr = new Date();
            var year = nstr.getFullYear();
            // console.log("year"+year)
            var month = nstr.getMonth() + 1;
            var day = nstr.getDate();
            // console.log("month" + month)
            // console.log(day)
            var month1;
            var month2;
            var year2 = year;
            var year3 = year;
            var year1 = year;
            if (month == 11) {
                month2 = 12;
                month3 = 1;

                year3++;
            } else if (month == 12) {
                month2 = 1;
                month3 = 2;
                year2++;
                year3++;
            } else {
                month2 = month + 1;
                month3 = month + 2;

            }

            // console.log(day)
            unicorn.initDate(year, month, month2, month3, day, year3, year1, year2);
        },
        getSectedDate: function () {
            return selectedDate;
        },
        is_leap: function (year) {
            return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
        },
        PrePage: function (ynow, m1, m2, m3, d, nextY, PreY, midY) {
            if (m1 == 1) {
                m3 = 2;
                m2 = 1;
                m1 = 12;
                PreY--;
                ynow--;

            } else if (m2 == 1) {
                m3 = 1;
                m2 = 12;
                m1 = 11;
                ynow--;
                midY--;

            }
            else if (m3 == 1) {
                m3 = 12;
                m2 = 11;
                m1 = 10;

                nextY--
            } else {
                m1--;
                m2--;
                m3--;

            }
            unicorn.initDate(ynow, m1, m2, m3, d, nextY, PreY, midY);
            $("table").find("tr").each(function () {
                $(this).find("td").each(function () {
                    var str = ($(this).closest("tbody").find(".switch").text() + "-" + $(this).text());
                    // console.log(str + "'''''''''''''''''''''''''''''''''''")
                    if (selectedDate.indexOf(str) > -1) {
                        // console.log(str)
                        $(this).addClass("active");
                    }
                });
            });
        },
        NextPage: function (ynow, m1, m2, m3, d, nextY, PreY, midY) {
            if (m3 == 12) {
                m3 = 1;
                m2 = 12;
                m1 = 11;
                nextY++;
                ynow++;

            } else if (m2 == 12) {
                m3 = 2;
                m2 = 1;
                m1 = 12;
                midY++;
                ynow++;
            }
            else if (m1 == 12) {
                m3 = 3;
                m2 = 2;
                m1 = 1;

                PreY++;

            } else {
                m1++;
                m2++;
                m3++;

            }
            unicorn.initDate(ynow, m1, m2, m3, d, nextY, PreY, midY);

            $("table").find("tr").each(function () {
                $(this).find("td").each(function () {
                    var str = ($(this).closest("tbody").find(".switch").text() + "-" + $(this).text());
                    // console.log(str + "'''''''''''''''''''''''''''''''''''")
                    if (selectedDate.indexOf(str) > -1) {
                        // console.log(str)
                        $(this).addClass("active");
                    }
                });
            });
        }


    }
})()

