function joinSubmit(f) {
	if(f.email.value.trim() === "") {
		alert("이메일을 입력하세요.");
		f.email.focus();
		return false;
	}
	if(f.userpw.value.trim() === "") {
		alert("패스워드를 입력하세요.");
		f.userpw.focus();
		return false;
	}
	if(f.username.value.trim() === "") {
		alert("이름(닉네임)을 입력하세요.");
		f.username.focus();
		return false;
	}
	return true;
}

function idChk(el) {
	if(el.value.trim()) {
		$.ajax({
			url: "/users/idchk",
			type: "post",
			dataType: "json", 
			data: {
				email: el.value.trim()
			}, 
			success: function(res) {
				if(res.result) {
					$(el).next().empty().removeClass("text-danger").addClass("text-success").text("* 멋진 이메일이에요");
				}
				else {
					$(el).next().empty().removeClass("text-success").addClass("text-danger").text("* 사용할수 없는 이메일 입니다.");
				}
			}, 
			error: function(xhr) {
				console.log(xhr);
			}
		});
	}
	else {

	}
}

function kakaoLogout(token) {
	$.ajax({
		url: "https://kapi.kakao.com/v1/user/logout",
		type: "post",
		dataType: "json",
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Authorization', 'Bearer '+token);
			xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		},
		success: function(res) {
			console.log(res);
			location.href = "/users/logout";
		},
		error: function(xhr, status, error) {
			console.log(xhr, status, error);
			alert("카카오 로그아웃에 실패하였습니다.");
			//location.href = "/";
		}
	})
}