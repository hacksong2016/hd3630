Template.homeCertification.onCreated(function() {
    this.subscribe("userDetail", facc.user()._id, {
        onReady: function() {
            loading.hide();
        }
    });
});
Template.homeCertification.helpers({
    user: function() {
        return Meteor.users.findOne({
            _id: facc.user()._id
        });
    }
});
Template.homeCertification.events({
    "click #pa-create": function(event) {

        var cd = Session.get("components-department");
        if (!cd.department) {
            alert("请选择科室");
            return false;
        }
        var ct = Session.get("components-thumb");
        if (!ct) {
            alert("请选择头像");
            return false;
        }


        var obj = {
            parentRegion: cd.parentRegion,
            parentRegionName: cd.parentRegionName,
            region: cd.region,
            regionName: cd.regionName,
            zone: cd.zone,
            zoneName: cd.zoneName,
            hospital: cd.hospital,
            hospitalName: cd.hospitalName,
            department: cd.department,
            departmentName: cd.departmentName,
            sdepartment: cd.sdepartment,
            sdepartmentName: cd.sdepartmentName,
            doctorName: $("#pa-name").val(),
            avatar: ct,
            createAt: new Date(),
            userid: facc.user()._id,
            status: 1,
            master: 0,
            sex: $("#pa-sex").val(),
            title: $("#pa-title").val(),
            cert: $("#photo").attr("data-image"),
            vaild: 0,
            submit: 1,

        };
        Doctors.insert(obj, function(err, res) {
            Meteor.call("uploadDoctorsPictures", { _id: res }, function() {
                alert("信息已提交，请等待审核");
                FlowRouter.go("/home")
            })
        });
    },
    "change #photo": function(event) {

        var that = $(event.currentTarget);

        lrz(event.currentTarget.files[0], {
            width: 720
        }).then(function(rst) {
            that.parent().css({
                "background-image": "url(" + rst.base64 + ")"
            });
            that.attr("data-image", rst.base64);

        });
    }
});
