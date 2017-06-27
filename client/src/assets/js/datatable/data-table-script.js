var rootURL, rootController;

function setJSVar(ctrl, root){
    rootController = ctrl;
    rootURL = root;
}

function ajaxBody(controller, pid, idnum, data){
    if (controller == rootController){
        jQuery("#" + pid + " .tablesorter tbody tr", data).each(function(ind){
            var addData =[];
            jQuery("#" + pid + " .tablesorter tbody tr:nth-child("+(ind + 1)+") td", data).each(function(index){
               addData.push(jQuery(this).html());
            });
            window["dtable"+idnum].fnAddData(addData);
        });
        jQuery("#" + pid + " .pagination").html(jQuery("#" + pid + " .pagination", data).html());
        var cond = (jQuery("#" + pid + " .currentStep").text() - 1 ) * jQuery("#" + pid + " .dTable_select select").val()
        if (cond < 0) cond = 0;
        var start = cond + 1;
        var end = cond + jQuery("#" + pid + " .tablesorter tbody tr", data).length;

        jQuery("#" + pid + " .startnum").text(start);
        jQuery("#" + pid + " .endnum").text(end);
        jQuery("#" + pid + " .total").text(jQuery("#" + pid + " .total", data).html());
    }else{
        jQuery(".tablesorter tbody tr", data).each(function(ind){
            var addData =[];
            jQuery(".tablesorter tbody tr:nth-child("+(ind + 1)+") td", data).each(function(index){
               addData.push(jQuery(this).html());
            });
            window["dtable"+idnum].fnAddData(addData);
        });
        jQuery("#" + pid + " .pagination").html(jQuery(".pagination", data).html());
        var cond = (jQuery("#" + pid + " .currentStep").text() - 1 ) * jQuery("#" + pid + " .dTable_select select").val()
        if (cond < 0) cond = 0;
        var start = cond + 1;
        var end = cond + jQuery(".tablesorter tbody tr", data).length;

        jQuery("#" + pid + " .startnum").text(start);
        jQuery("#" + pid + " .endnum").text(end);
        jQuery("#" + pid + " .total").text(jQuery(".total", data).html());
    }
    window["dtable"+idnum].fnSettings()._iDisplayLength = jQuery("#" + pid + " .dTable_select select").val();
    window["dtable"+idnum].fnDraw();
}

function hideDTablesInfo(pid){
    jQuery("#" + pid + " .dataTables_empty").html("Loading Data");
    jQuery("#" + pid + " .dTables_info").hide();
    jQuery("#" + pid + " .pagination").hide();
}

jQuery(document).ajaxStop(function(){
    if (jQuery(".dataTables_empty").length>0) jQuery(".dTables_info").hide();
    else jQuery(".dTables_info").show();
    jQuery(".pagination").show();
});

jQuery(document).delegate(".dTable_select select", "change", function(){
    var idnum = jQuery(this).parent().parent().parent().attr("id").replace(/^\D+/g, '');
    var pid = jQuery(this).parent().parent().parent().attr("id");
    var search = jQuery("#" + pid + " #searchID").val();
    var controller = jQuery("#" + pid + " #controllerID").val();
    var action = jQuery("#" + pid + " #actionID").val();
    var selTxt = jQuery(this).val();
    window["dtable"+idnum].fnClearTable(); 
    var dataMap = {max: selTxt,offset:0};
    if (jQuery("#" + pid + " #filterTxt").length > 0) dataMap['keyword']=jQuery("#" + pid + " #filterTxt").val();
    if (jQuery("#" + pid + " #specialID").length > 0) dataMap['isSpecial'] = jQuery("#" + pid + " #specialID").val();
    if (jQuery("#dropdown-filter-reservation").length > 0) dataMap['examSchedule'] = jQuery("#dropdown-filter-reservation").val();
    if (jQuery("#statusID").length > 0) dataMap['status'] = jQuery("#statusID").val();
    jQuery.ajax({
        url: rootURL + controller + "/" + action,
        data: dataMap,
        dataType: 'html',
        success: function(data){
            ajaxBody(controller, pid, idnum, data);
            if (jQuery(".tablesorter").length == 1){
                var urlParams = "?max=" + selTxt + "&offset=0";
                if (jQuery("#" + pid + " #filterTxt").length > 0) urlParams = urlParams + "&keyword=" + jQuery("#" + pid + " #filterTxt").val();
                if (jQuery("#" + pid + " #specialID").length > 0) urlParams = urlParams + "&isSpecial=" + jQuery("#" + pid + " #specialID").val();
                if (jQuery("#statusID").length > 0) urlParams = urlParams + "&status=" + jQuery("#statusID").val();
                if (jQuery("#dropdown-filter-reservation").length > 0) urlParams = urlParams + "&examSchedule=" + jQuery("#dropdown-filter-reservation").val();
                console.log(urlParams);
                window.history.pushState("", "", action + urlParams);
            }    
        }
    });
    hideDTablesInfo(pid);
});

jQuery(document).delegate("#btnSubmit", "click", function(e){
    var idnum = jQuery(this).parent().parent().parent().parent().attr("id").replace(/^\D+/g, '');
    var pid = jQuery(this).parent().parent().parent().parent().attr("id");
    var search = jQuery("#" + pid + " #searchID").val();
    var controller = jQuery("#" + pid + " #controllerID").val();
    jQuery("#" + pid + " #actionID").val(search);
    window["dtable"+idnum].fnClearTable(); 
    var dataMap = {max: jQuery("#" + pid + " .dTable_select select").val(),offset:0};
    if (jQuery("#" + pid + " #filterTxt").length > 0) dataMap['keyword']=jQuery("#" + pid + " #filterTxt").val();
    if (jQuery("#" + pid + " #specialID").length > 0) dataMap['isSpecial'] = jQuery("#" + pid + " #specialID").val();
    if (jQuery("#dropdown-filter-reservation").length > 0) dataMap['examSchedule'] = jQuery("#dropdown-filter-reservation").val();
    if (jQuery("#statusID").length > 0) dataMap['status'] = jQuery("#statusID").val();
    jQuery.ajax({
        url: rootURL + controller + "/" + search,
        data: dataMap,
        success: function(data){
            ajaxBody(controller, pid, idnum, data);
            if (jQuery("#" + pid + " .dataTables_empty").length>0) jQuery("#" + pid + " .dTables_info").hide();
            else jQuery("#" + pid + " .dTables_info").css("display","block");
            if (jQuery(".tablesorter").length == 1){
                var urlParams = "?max=" + jQuery("#" + pid + " .dTable_select select").val() + "&offset=0";
                if (jQuery("#" + pid + " #filterTxt").length > 0) urlParams = urlParams + "&keyword=" + jQuery("#" + pid + " #filterTxt").val();
                if (jQuery("#" + pid + " #specialID").length > 0) urlParams = urlParams + "&isSpecial=" + jQuery("#" + pid + " #specialID").val();
                if (jQuery("#statusID").length > 0) urlParams = urlParams + "&status=" + jQuery("#statusID").val();
                if (jQuery("#dropdown-filter-reservation").length > 0) urlParams = urlParams + "&examSchedule=" + jQuery("#dropdown-filter-reservation").val();
                window.history.pushState("", "", search + urlParams);    
            }
        }
    });    
    hideDTablesInfo(pid);
});

jQuery(document).delegate(".pagination a", "click", function(e){
    e.preventDefault();
    var idnum = jQuery(this).parent().parent().parent().parent().attr("id").replace(/^\D+/g, '');
    var pid = jQuery(this).parent().parent().parent().parent().attr("id");
    var search = jQuery("#" + pid + " #searchID").val();
    var controller = jQuery("#" + pid + " #controllerID").val();
    var urlContainer = jQuery(this).attr("href");
    window["dtable"+idnum].fnClearTable(); 
    jQuery.ajax({
        url: urlContainer,
        success: function(data){
            ajaxBody(controller, pid, idnum, data);
            if (jQuery(".tablesorter").length == 1) window.history.pushState("","", urlContainer);
        }
    });
    hideDTablesInfo(pid);
});

jQuery(function(){ 
    if (jQuery("[id^='data-table']").length > 0){
        jQuery("div[id^='data-table']").each(function(index){
            var pid = jQuery(this).attr('id');
            var cond = (jQuery("#" + pid + " .currentStep").text() - 1 ) * jQuery("#" + pid + " .dTable_select select").val()
            if (cond < 0) cond = 0;
            var start = cond + 1;
            var end = cond + jQuery("#" + pid + " .tablesorter tbody tr").length;
            jQuery("#" + pid + " .startnum").text(start);
            jQuery("#" + pid + " .endnum").text(end);
            if (jQuery("#" + pid + " .btn-group").length > 0){
                if (jQuery("#" + pid + " .tablesorter .btn-group:first").parent().is('form')) var ind = jQuery("#" + pid + " .btn-group:first").parent().parent().index();
                else var ind = jQuery("#" + pid + " .btn-group:first").parent().index();
                window["dtable"+index] = jQuery("#" + pid + " .tablesorter").dataTable({
                "bInfo": true,
                "iDisplayLength": jQuery("#" + pid + " .tablesorter tbody tr").length, 
                "bJQueryUI": false,
                "aoColumnDefs": [{
                    "bSortable": false,
                    "bSearchable":false,
                    "aTargets": [ind]
                }],
                "sDom": 't', 
                "bDestroy": true,
                "aaSorting": []});//, "sPaginationType": "full_numbers"});
            } else {
                window["dtable"+index] = jQuery("#" + pid + " .tablesorter").dataTable({
                "bInfo": true, 
                "iDisplayLength": jQuery("#" + pid + " .tablesorter tbody tr").length,
                "bJQueryUI": false,
                "bDestroy": true,
                "sDom": 't', 
                "aaSorting": []});//, "sPaginationType": "full_numbers"}); 
            }
            jQuery("#" + pid + " select").addClass("span2"); 
            if (jQuery("#" + pid + " .dataTables_empty").length > 0) jQuery("#" + pid + " .dTables_info").hide();
        });
    } 
});