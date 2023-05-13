(function () {
    freeboard.addStyle('.html-widget', "white-space:normal;width:100%;height:100%;padding:10px");
    freeboard.addStyle('input[type=checkbox]:checked + label.strikethrough', "text-decoration: line-through;");

    var ChecklistWidget = function (settings) {
        var self = this;
        var htmlElement = $('<div class="html-widget"></div>');
        var currentSettings = settings;

        this.render = function (element) {
            $(element).append(htmlElement);
        }

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName == "items") {
                var checklistItems = newValue
                var listElement = $('<ul/>', { css: { 'padding': '10px', 'white-space': 'nowrap' } });
                $.each(checklistItems, function (index, value) {
                    var itemElement = $('<li/>')
                    var id = Math.floor(Math.random() * 10000)
                    $('<input />', { type: 'checkbox', id: id, css: { 'width': '20px', 'height': '20px', 'margin-right': '5px' } }).appendTo(itemElement);
                    $('<label />', { for: id, text: value, class: 'strikethrough', css: { 'font-size': '30px' } }).appendTo(itemElement);

                    listElement.append(itemElement);
                });

                $(htmlElement).html(listElement);
            }
        }

        this.onDispose = function () {
        }

        this.getHeight = function () {
            return Number(currentSettings.height);
        }

        this.onSettingsChanged(settings);
    };

    freeboard.loadWidgetPlugin({
        "type_name": "checklist",
        "display_name": "Checklist",
        "fill_size": true,
        "settings": [
            {
                "name": "items",
                "display_name": "Checklist items",
                "type": "calculated",
                "description": "A JSON array of checklist items"
            },
            {
                "name": "height",
                "display_name": "Height Blocks",
                "type": "number",
                "default_value": 4,
                "description": "A height block is around 60 pixels"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new ChecklistWidget(settings));
        }
    });
}());