(function($) {

    $.fn.extend({
        chartjsdonut: function(options, arg) {
			var defaults = {
				size: 100,
				data: null,
				colors: null,
				animation : true,
				percentageInnerCutout: 60,
				label: null,
				labelColor: '#000000',
				font: "24px sans-serif",
				labelXOffset: 0,
				labelYOffset: 7,
                labelShadowColor : '#ffffff',
				labelShadowOffsetX : 0,
                labelShadowOffsetY : 1
			};
			
            if (options && typeof options === 'object') {
                options = $.extend( {}, defaults, options );
            }
			
            this.each(function() {
                new $.chartjsdonut($(this), options, arg );
            });
            return;
        }
    });

    $.chartjsdonut = function( elem, options ) {	
		var canvas = document.createElement('canvas');
		elem.append(canvas);
		canvas.width  = options.size;
		canvas.height = options.size;
		
		if (typeof(G_vmlCanvasManager) != 'undefined'){
        	G_vmlCanvasManager.initElement(canvas);
        }

		var ctx = canvas.getContext("2d");

		var cX = canvas.width / 2;
		var cY = canvas.height / 2;

		var label = "";
			
		if (options.label){
			label = options.label;
		}else{
			label = options.data[0];
		}

		var data = [];
		for (var i = 0; i < options.data.length; i++) {
			data.push({
				value : options.data[i],
                color : options.colors[i]
            });
		}
		
        var chartOptions = {
            percentageInnerCutout : options.percentageInnerCutout,
            onAnimationComplete : function(){ complete(options) },
            animation : options.animation
        };			

		function complete(options) {
			if(options.label){
				console.log(options);
				ctx.fillStyle = options.labelColor;
				ctx.textAlign = 'center';
				ctx.font = options.font;
				ctx.shadowColor = options.labelShadowColor;
				ctx.shadowOffsetX = options.labelShadowOffsetX;
				ctx.shadowOffsetY = options.labelShadowOffsetY;
				ctx.fillText(options.label, cX + options.labelXOffset, cY + options.labelYOffset);
			}		
		}

        new Chart(ctx).Doughnut(data, chartOptions);	
	};
})(jQuery);