const Axios = require('axios');

module.exports = {

    //
    //endPoint is with port
    //
    async triggerPipelineInstance(endPoint, instanceId, token, requestBody) {

        try {

            let response = await Axios({
                url: `${endPoint}/api/latest/pipeline/instance/${instanceId}`,
                headers: {authorization: 'Bearer ' + token},
                method: 'POST',
                data: requestBody
            });

            return response.data;

        } catch (err) {
            console.error(err);
        }
    },

    async getPipelineInstanceResult(endPoint, instanceId, token) {

        try {

            let response = await Axios({
                url: `${endPoint}/api/latest/pipeline/instance/${instanceId}`,
                headers: {authorization: 'Bearer ' + token},
                method: 'GET'
            });


            if (response.status === 200) {

            }

            return response.data;

        } catch (err) {
            console.error(err);
        }

    },

    async createPipeline(endPoint, token, requestBody) {

        try {

            let response = await Axios({
                url: `${endPoint}/api/latest/pipeline`,
                headers: {authorization: 'Bearer ' + token},
                method: 'POST',
                data: requestBody
            });


            if (response.status === 200) {

            }

            return response.data;

        } catch (err) {
            console.error(err);
        }

    },

    async getPipelines(endPoint, token) {

        return $.ajax({
            url: `${endPoint}/api/latest/pipelines`,
            type: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            error: function (xhr, status) {
                throw new Error('Something went wrong!')
            }
        });
    },

    async getPipelineInstanceDetails(endPoint, token, pipeline_instance_id) {

        return $.ajax({
            url: `${endPoint}/api/latest/pipeline/${pipeline_instance_id}`,
            type: "GET",
            headers: {"Authorization": `Bearer ${token}`},
            error: function (xhr, status) {
                throw new Error('Something went wrong!')
            }
        });

    },

    async waitForPipelineToFinish(endPoint, instanceId, token) {

        const MaxNumberOfTries = 10;

        let numberOfTries = 0;

        while (numberOfTries <= MaxNumberOfTries) {

            let pipeline_result = await this.getPipelineInstanceResult(endPoint, instanceId, token);

            numberOfTries++;

            switch (pipeline_result.data.pipeline.status) {

                case 'IN PROGRESS' :

                    await this.wait(5000);
                    break;

                case 'NOT STARTED' :

                    await this.wait(5000);
                    break;

                case 'COMPLETED' :

                    return pipeline_result.data.pipeline.pipeline_instance_result;

                case 'FAILED':

                    return null;

            }
        }
    },

    isNotFinished(pipelineResult) {

        return pipelineResult.hasOwnProperty('data') && pipelineResult.data.hasOwnProperty('pipeline') && pipelineResult.data.pipeline.status === 'IN PROGRESS';
    },

    wait: (duration) => new Promise(resolve => {
        setTimeout(resolve, duration);
    }),

    getPipelineInstanceId() {

    }
};
