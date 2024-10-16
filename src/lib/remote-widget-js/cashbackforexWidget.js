function RemoteCalc(WidgetConfig) {
	if (WidgetConfig.Url == undefined) {
		WidgetConfig.Url = 'https://www.cashbackforex.com'
	}
	var ifrm = document.createElement('iframe')
	ifrm.setAttribute('calc-id', 'ifrm-cbf-' + WidgetConfig.ContainerId) // assign an id
	ifrm.setAttribute('scrolling', 'no')
	ifrm.setAttribute('widgetType', 'calculator')
	ifrm.setAttribute(
		'style',
		'width:100%; border: 0; overflow: hidden; height:500px; color-scheme: normal'
	)

	var frameSrc = WidgetConfig.Url
	if (WidgetConfig.Lang != undefined) {
		if (WidgetConfig.Lang == 'page' && this.document.documentElement.lang != '')
			frameSrc += '/' + this.document.documentElement.lang
		else if (WidgetConfig.Lang != 'page') frameSrc += '/' + WidgetConfig.Lang
	}

	frameSrc += '/widgets/' + WidgetConfig.Calculator

	if (WidgetConfig.IsDisplayTitle === true) {
		frameSrc += '?IsDisplayTitle=true'
	} else {
		frameSrc += '?IsDisplayTitle=false'
	}
	if (WidgetConfig.IsShowChartLinks !== undefined) {
		frameSrc += '&ShowChartLinks=' + WidgetConfig.IsShowChartLinks
	}
	if (WidgetConfig.TopPaneStyle != undefined) {
		frameSrc += '&TopPaneStyle=' + WidgetConfig.TopPaneStyle
	}
	if (WidgetConfig.BottomPaneStyle != undefined) {
		frameSrc += '&BottomPaneStyle=' + WidgetConfig.BottomPaneStyle
	}
	if (WidgetConfig.ButtonStyle != undefined) {
		frameSrc += '&ButtonStyle=' + WidgetConfig.ButtonStyle
	}
	if (WidgetConfig.TitleStyle != undefined) {
		frameSrc += '&TitleStyle=' + WidgetConfig.TitleStyle
	}
	if (WidgetConfig.TextboxStyle != undefined) {
		frameSrc += '&TextboxStyle=' + WidgetConfig.TextboxStyle
	}
	var width = '100%'
	if (WidgetConfig.ContainerWidth != undefined) {
		frameSrc += '&MaxWidth=' + WidgetConfig.ContainerWidth
		if (
			WidgetConfig.ContainerWidth.endsWith('px') ||
			/^[0-9]*\.?[0-9]*$/.test(WidgetConfig.ContainerWidth)
		) {
			const parsed = parseFloat(WidgetConfig.ContainerWidth, 10)
			if (isNaN(parsed)) {
				width = WidgetConfig.ContainerWidth + 'px'
			} else {
				width = parsed + 1 + 'px'
			}
		} else if (WidgetConfig.ContainerWidth.endsWith('%')) {
			width = WidgetConfig.ContainerWidth
		}
	}
	if (WidgetConfig.ContainerId != undefined) {
		frameSrc += '&ContainerId=' + WidgetConfig.ContainerId
	}
	if (WidgetConfig.AffiliateId != undefined && WidgetConfig.AffiliateId != null) {
		frameSrc += '&AffiliateId=' + WidgetConfig.AffiliateId
	}
	if (WidgetConfig.CompactType) {
		frameSrc += '&CompactType=' + WidgetConfig.CompactType
	}
	if (WidgetConfig.DefaultCurrencyFrom) {
		frameSrc += '&DefaultCurrencyFrom=' + WidgetConfig.DefaultCurrencyFrom
	}
	if (WidgetConfig.DefaultCurrencyTo) {
		frameSrc += '&DefaultCurrencyTo=' + WidgetConfig.DefaultCurrencyTo
	}
	if (WidgetConfig.HighlightColor) {
		frameSrc += '&HighlightColor=' + encodeURIComponent(WidgetConfig.HighlightColor)
	}
	if (WidgetConfig.DefaultInstrument) {
		frameSrc += '&DefaultInstrument=' + encodeURIComponent(WidgetConfig.DefaultInstrument)
	}
	if (WidgetConfig.DefaultExchange) {
		frameSrc += '&DefaultExchange=' + encodeURIComponent(WidgetConfig.DefaultExchange)
	}

	if (WidgetConfig.DefaultBalance) {
		frameSrc += '&DefaultBalance=' + WidgetConfig.DefaultBalance
	}

	if (WidgetConfig.DefaultPeriod) {
		frameSrc += '&DefaultPeriod=' + WidgetConfig.DefaultPeriod
	}

	if (WidgetConfig.DefaultGain) {
		frameSrc += '&DefaultGain=' + WidgetConfig.DefaultGain
	}

	if (WidgetConfig.IsShowEmbedButton !== undefined) {
		frameSrc += '&IsShowEmbedButton=' + WidgetConfig.IsShowEmbedButton
	}
	if (WidgetConfig.IsShowBuyCryptoButton !== undefined) {
		frameSrc += '&IsShowBuyCryptoButton=' + WidgetConfig.IsShowBuyCryptoButton
	}
	if (WidgetConfig.SAID !== undefined) {
		frameSrc += '&said=' + WidgetConfig.SAID
	}

	if (WidgetConfig.DefaultThemeMode !== undefined) {
		frameSrc += '&DefaultThemeMode=' + WidgetConfig.DefaultThemeMode
	}

	if (WidgetConfig.Width !== undefined) {
		frameSrc += '&Width=' + WidgetConfig.Width
	}

	if (WidgetConfig.WidgetProperties !== undefined) {
		frameSrc += '&WidgetProperties=' + JSON.stringify(WidgetConfig.WidgetProperties)
	}

	ifrm.setAttribute('src', frameSrc)

	if (window.addEventListener) {
		window.addEventListener('message', onRemoteCalcMessage, false)
	} else if (window.attachEvent) {
		window.attachEvent('onmessage', onRemoteCalcMessage, false)
	}

	var containerDiv = document.getElementById(WidgetConfig.ContainerId)
	var styleString = 'position: relative; max-width: ' + width + ';'
	if (WidgetConfig.Calculator == 'reviews') {
		styleString += 'display: inline-block'
	}
	containerDiv.style = styleString
	containerDiv.innerHTML = ''
	containerDiv.appendChild(ifrm)

	ifrm.addEventListener('load', function () {
		ifrm.contentWindow.postMessage(
			{
				method: 'calc-log',
				url: window.location.href,
				calc: WidgetConfig.Calculator,
				host: window.location.host
			},
			'*'
		)
	})
}

function resizeCBFCalcWidget(data) {
	var width = '100%'
	if (data.containerId.includes('review')) {
		width = data.targetWidth + 'px'
	}
	var ifrms = document.querySelectorAll('iframe[calc-id=ifrm-cbf-' + data.containerId + ']')
	for (var i = 0; i < ifrms.length; i++) {
		ifrms[i].setAttribute(
			'style',
			'width:' + width + '; border: 0; color-scheme: normal; height:' + data.targetHeight + 'px;'
		)
		ifrms[i].setAttribute('title', data.title)
	}
}
function popoutPositionCalcWidget(data) {
	var ifrm = document.querySelectorAll('iframe[calc-id=ifrm-cbf-' + data.containerId + ']')[0]

	var color = '#0A1F41'
	if (data.color && data.color !== '') {
		color = data.color
	}
	var containerDiv = document.getElementById(data.containerId)

	var popLinks = document.querySelectorAll('#' + data.containerId + '>a')
	for (var i = 0; i < popLinks.length; i++) {
		popLinks[i].remove()
	}
	var popoutDiv = document.createElement('a')
	popoutDiv.setAttribute('onclick', 'return popoutCBFWidget(this);')
	popoutDiv.href = data.link + '#popout'
	popoutDiv.target = '_blank'
	popoutDiv.innerHTML =
		'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z/CfiYEIwDiqkL4KAYFAFAs8gr9XAAAAAElFTkSuQmCC" style="position: absolute; top:0; left:0; background: transparent !important; border: 0px solid; box-shadow: none !important; -webkit-box-shadow: none !important; padding: 0px;" alt="' +
		data.title +
		'"><svg width="19" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
		'<title>' +
		data.title +
		'</title>' +
		'<path d = "M12 12.6667H4C3.63333 12.6667 3.33333 12.3667 3.33333 12V4C3.33333 3.63333 3.63333 3.33333 4 3.33333H7.33333C7.7 3.33333 8 3.03333 8 2.66667C8 2.3 7.7 2 7.33333 2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V8.66667C14 8.3 13.7 8 13.3333 8C12.9667 8 12.6667 8.3 12.6667 8.66667V12C12.6667 12.3667 12.3667 12.6667 12 12.6667ZM9.33333 2.66667C9.33333 3.03333 9.63333 3.33333 10 3.33333H11.7267L5.64 9.42C5.38 9.68 5.38 10.1 5.64 10.36C5.9 10.62 6.32 10.62 6.58 10.36L12.6667 4.27333V6C12.6667 6.36667 12.9667 6.66667 13.3333 6.66667C13.7 6.66667 14 6.36667 14 6V2H10C9.63333 2 9.33333 2.3 9.33333 2.66667Z" fill = "' +
		color +
		'" /></svg></div>'
	popoutDiv.title = data.title
	popoutDiv.style =
		'position: absolute; top: ' +
		data.top +
		'px; right: ' +
		data.right +
		'px; line-height: 0px; background: transparent; border'
	containerDiv.appendChild(popoutDiv)
}
function onRemoteCalcMessage(event) {
	// Check sender origin to be trusted
	//if (RebateWidgetConfig.Url != "" && event.origin !== RebateWidgetConfig.Url) return;

	var data = event.data

	if (typeof window[data.func] == 'function') {
		window[data.func].call(null, data)
	}
}

function popoutCBFWidget(e) {
	var link = e.href
	var height = e.parentElement.offsetHeight + 5
	window.open(link, '', 'width=640, height=' + height)
	return false
}

window.RemoteCalc = RemoteCalc
